-- ============================================================================
-- CineMatch: Advanced Database Management System (ADBMS) Demonstration Queries
-- Project: CineMatch – Movie Recommendation System
-- Database: PostgreSQL (Supabase)
-- 
-- This file contains practical SQL demonstrations of core ADBMS concepts
-- designed for undergraduate viva and evaluation:
-- 1. Selection & Projection
-- 2. Multi-Table JOINs (Inner, Left, Junction Tables)
-- 3. Aggregate Functions (COUNT, AVG, MIN, MAX)
-- 4. GROUP BY & HAVING Clauses
-- 5. Subqueries (Scalar, Correlated, IN)
-- 6. Common Table Expressions (CTE - WITH Clause)
-- 7. Database View Querying (movie_rating_summary)
-- 8. Index Creation & EXPLAIN ANALYZE Performance Analysis
-- 9. Practical Recommendation Engine SQL Query
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. SELECTION & PROJECTION
-- Retrieve popular Sci-Fi and Action movies released after 2010
-- ----------------------------------------------------------------------------
SELECT 
    movie_id,
    title,
    release_year,
    director,
    popularity
FROM 
    public.movies
WHERE 
    release_year >= 2010 
    AND popularity > 90.0
ORDER BY 
    popularity DESC
LIMIT 10;


-- ----------------------------------------------------------------------------
-- 2. MULTI-TABLE INNER JOIN
-- Join 3 tables (movies -> movie_genres -> genres) to list movies with all their genres
-- Uses STRING_AGG to aggregate multiple genres into a comma-separated list
-- ----------------------------------------------------------------------------
SELECT 
    m.movie_id,
    m.title,
    m.release_year,
    STRING_AGG(g.genre_name, ', ' ORDER BY g.genre_name) AS genres_list
FROM 
    public.movies m
JOIN 
    public.movie_genres mg ON m.movie_id = mg.movie_id
JOIN 
    public.genres g ON mg.genre_id = g.genre_id
GROUP BY 
    m.movie_id, m.title, m.release_year
ORDER BY 
    m.title ASC
LIMIT 15;


-- ----------------------------------------------------------------------------
-- 3. MULTI-TABLE LEFT JOIN WITH RATINGS
-- Retrieve movies along with their average user rating and review count
-- LEFT JOIN ensures movies with zero ratings are still returned
-- ----------------------------------------------------------------------------
SELECT 
    m.movie_id,
    m.title,
    m.release_year,
    COUNT(r.rating_id) AS total_reviews,
    ROUND(COALESCE(AVG(r.rating), 0)::numeric, 2) AS avg_rating
FROM 
    public.movies m
LEFT JOIN 
    public.ratings r ON m.movie_id = r.movie_id
GROUP BY 
    m.movie_id, m.title, m.release_year
ORDER BY 
    avg_rating DESC, total_reviews DESC
LIMIT 10;


-- ----------------------------------------------------------------------------
-- 4. GROUP BY AND HAVING CLAUSE
-- Find genres that have an average movie rating >= 4.0 and at least 3 rated reviews
-- Demonstrates filtering on aggregated groups
-- ----------------------------------------------------------------------------
SELECT 
    g.genre_name,
    COUNT(r.rating_id) AS review_count,
    ROUND(AVG(r.rating)::numeric, 2) AS avg_genre_rating
FROM 
    public.genres g
JOIN 
    public.movie_genres mg ON g.genre_id = mg.genre_id
JOIN 
    public.ratings r ON mg.movie_id = r.movie_id
GROUP BY 
    g.genre_id, g.genre_name
HAVING 
    COUNT(r.rating_id) >= 2 
    AND AVG(r.rating) >= 4.0
ORDER BY 
    avg_genre_rating DESC;


-- ----------------------------------------------------------------------------
-- 5. SUBQUERY: Find movies whose rating is above the global average rating
-- Demonstrates a non-correlated subquery returning a scalar aggregate
-- ----------------------------------------------------------------------------
SELECT 
    m.movie_id,
    m.title,
    ROUND(AVG(r.rating)::numeric, 2) AS movie_avg_rating
FROM 
    public.movies m
JOIN 
    public.ratings r ON m.movie_id = r.movie_id
GROUP BY 
    m.movie_id, m.title
HAVING 
    AVG(r.rating) > (
        -- Subquery: Global Average Rating across all reviews in database
        SELECT AVG(rating) FROM public.ratings
    )
ORDER BY 
    movie_avg_rating DESC;


-- ----------------------------------------------------------------------------
-- 6. COMMON TABLE EXPRESSION (CTE): Top Genre Affinity
-- Computes the user's top genres using a WITH clause and then recommends unrated movies
-- ----------------------------------------------------------------------------
WITH UserTopGenres AS (
    -- Step 1: Find genres from movies the user has rated 4 or 5 stars
    SELECT 
        mg.genre_id,
        COUNT(*) AS match_weight
    FROM 
        public.ratings r
    JOIN 
        public.movie_genres mg ON r.movie_id = mg.movie_id
    WHERE 
        r.rating >= 4
        -- AND r.user_id = 'YOUR_USER_UUID_HERE' (in production)
    GROUP BY 
        mg.genre_id
),
CandidateMovies AS (
    -- Step 2: Retrieve movies belonging to these top genres
    SELECT 
        m.movie_id,
        m.title,
        m.release_year,
        m.popularity,
        SUM(utg.match_weight) AS genre_affinity_score
    FROM 
        public.movies m
    JOIN 
        public.movie_genres mg ON m.movie_id = mg.movie_id
    JOIN 
        UserTopGenres utg ON mg.genre_id = utg.genre_id
    WHERE 
        m.movie_id NOT IN (
            -- Exclude movies already rated by this user
            SELECT movie_id FROM public.ratings
            -- WHERE user_id = 'YOUR_USER_UUID_HERE'
        )
    GROUP BY 
        m.movie_id, m.title, m.release_year, m.popularity
)
-- Step 3: Combine genre affinity with movie popularity for final ranking
SELECT 
    cm.movie_id,
    cm.title,
    cm.release_year,
    cm.popularity,
    cm.genre_affinity_score,
    ROUND((cm.genre_affinity_score * 10 + cm.popularity)::numeric, 2) AS recommendation_rank_score
FROM 
    CandidateMovies cm
ORDER BY 
    recommendation_rank_score DESC
LIMIT 10;


-- ----------------------------------------------------------------------------
-- 7. QUERYING THE DATABASE VIEW: movie_rating_summary
-- The view encapsulates the complex LEFT JOIN and aggregate calculations
-- ----------------------------------------------------------------------------
SELECT 
    movie_id,
    title,
    release_year,
    popularity,
    average_rating,
    rating_count
FROM 
    public.movie_rating_summary
WHERE 
    average_rating >= 4.5
ORDER BY 
    rating_count DESC, popularity DESC
LIMIT 10;


-- ----------------------------------------------------------------------------
-- 8. QUERYING WATCHLIST WITH JOIN
-- Retrieve all movies saved by a user with their genres and rating summary
-- ----------------------------------------------------------------------------
SELECT 
    w.watchlist_id,
    w.added_at,
    m.movie_id,
    m.title,
    m.release_year,
    m.poster_url,
    v.average_rating,
    v.rating_count
FROM 
    public.watchlists w
JOIN 
    public.movies m ON w.movie_id = m.movie_id
LEFT JOIN 
    public.movie_rating_summary v ON m.movie_id = v.movie_id
-- WHERE w.user_id = 'YOUR_USER_UUID_HERE'
ORDER BY 
    w.added_at DESC;


-- ----------------------------------------------------------------------------
-- 9. PERFORMANCE OPTIMIZATION & EXPLAIN ANALYZE
-- Inspect the execution plan, cost estimate, and actual timing
-- ----------------------------------------------------------------------------

-- A. Title Search using B-tree Index (Index Scan / Bitmap Index Scan)
EXPLAIN ANALYZE
SELECT 
    movie_id, title, release_year, popularity
FROM 
    public.movies
WHERE 
    title ILIKE 'The Dark%';

-- B. Genre Junction Table Join with Index Scan
EXPLAIN ANALYZE
SELECT 
    m.title, g.genre_name
FROM 
    public.movies m
JOIN 
    public.movie_genres mg ON m.movie_id = mg.movie_id
JOIN 
    public.genres g ON mg.genre_id = g.genre_id
WHERE 
    mg.genre_id = 7; -- Science Fiction


-- ----------------------------------------------------------------------------
-- 10. SYSTEM METRICS QUERY (Admin Dashboard Aggregate)
-- Computes global system-wide summary stats in a single fast query
-- ----------------------------------------------------------------------------
SELECT 
    (SELECT COUNT(*) FROM public.movies) AS total_movies,
    (SELECT COUNT(*) FROM public.genres) AS total_genres,
    (SELECT COUNT(*) FROM public.ratings) AS total_ratings,
    (SELECT ROUND(COALESCE(AVG(rating), 0)::numeric, 2) FROM public.ratings) AS platform_avg_rating,
    (SELECT COUNT(*) FROM public.watchlists) AS total_watchlist_items;
