-- ============================================================================
-- CineMatch: Movie Recommendation System
-- Migration 01: Initial Schema, Views, Indexes, and RLS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.user_profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100),
    is_admin BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year INT NOT NULL CHECK (release_year >= 1888 AND release_year <= 2100),
    description TEXT,
    poster_url TEXT,
    backdrop_url TEXT,
    popularity NUMERIC(5, 2) DEFAULT 50.0 CHECK (popularity >= 0),
    duration_mins INT DEFAULT 120,
    director VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.genres (
    genre_id SERIAL PRIMARY KEY,
    genre_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.movie_genres (
    movie_id INT NOT NULL REFERENCES public.movies(movie_id) ON DELETE CASCADE,
    genre_id INT NOT NULL REFERENCES public.genres(genre_id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, genre_id)
);

CREATE TABLE IF NOT EXISTS public.ratings (
    rating_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    movie_id INT NOT NULL REFERENCES public.movies(movie_id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_movie_rating UNIQUE (user_id, movie_id)
);

CREATE TABLE IF NOT EXISTS public.watchlists (
    watchlist_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    movie_id INT NOT NULL REFERENCES public.movies(movie_id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_movie_watchlist UNIQUE (user_id, movie_id)
);

CREATE TABLE IF NOT EXISTS public.user_preferences (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    genre_id INT NOT NULL REFERENCES public.genres(genre_id) ON DELETE CASCADE,
    preference_score NUMERIC(4, 2) DEFAULT 1.0 CHECK (preference_score >= 0),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, genre_id)
);

CREATE INDEX IF NOT EXISTS idx_movies_title ON public.movies USING btree (title);
CREATE INDEX IF NOT EXISTS idx_movies_popularity ON public.movies USING btree (popularity DESC);
CREATE INDEX IF NOT EXISTS idx_movies_release_year ON public.movies USING btree (release_year DESC);
CREATE INDEX IF NOT EXISTS idx_movie_genres_genre_id ON public.movie_genres (genre_id);
CREATE INDEX IF NOT EXISTS idx_movie_genres_movie_id ON public.movie_genres (movie_id);
CREATE INDEX IF NOT EXISTS idx_ratings_movie_id ON public.ratings (movie_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON public.ratings (user_id);
CREATE INDEX IF NOT EXISTS idx_watchlists_user_id ON public.watchlists (user_id);
CREATE INDEX IF NOT EXISTS idx_watchlists_movie_id ON public.watchlists (movie_id);

CREATE OR REPLACE VIEW public.movie_rating_summary AS
SELECT 
    m.movie_id,
    m.title,
    m.release_year,
    m.description,
    m.poster_url,
    m.backdrop_url,
    m.popularity,
    m.duration_mins,
    m.director,
    ROUND(COALESCE(AVG(r.rating), 0)::numeric, 1) AS average_rating,
    COUNT(r.rating_id)::integer AS rating_count
FROM 
    public.movies m
LEFT JOIN 
    public.ratings r ON m.movie_id = r.movie_id
GROUP BY 
    m.movie_id,
    m.title,
    m.release_year,
    m.description,
    m.poster_url,
    m.backdrop_url,
    m.popularity,
    m.duration_mins,
    m.director;

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movie_genres ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for movies" ON public.movies FOR SELECT USING (true);
CREATE POLICY "Public read access for genres" ON public.genres FOR SELECT USING (true);
CREATE POLICY "Public read access for movie_genres" ON public.movie_genres FOR SELECT USING (true);
CREATE POLICY "Public read access for user profiles" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Public read access for ratings" ON public.ratings FOR SELECT USING (true);
CREATE POLICY "Users can insert own ratings" ON public.ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ratings" ON public.ratings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ratings" ON public.ratings FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Users can view only their own watchlist" ON public.watchlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert into their own watchlist" ON public.watchlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete from their own watchlist" ON public.watchlists FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert/update their own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (user_id, username, full_name, is_admin)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'is_admin')::boolean, FALSE)
    )
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
