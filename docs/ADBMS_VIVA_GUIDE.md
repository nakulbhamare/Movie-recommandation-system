# CineMatch – ADBMS Mini-Project Viva & Evaluation Guide

This guide is curated specifically for undergraduate viva voce examinations and lab presentations. It breaks down each database concept implemented in **CineMatch**, providing concise explanations and exact code references.

---

## 1. Relational Schema & 3NF Normalization

### Tables Overview
1. **`user_profiles`**: Extends Supabase authentication identity (`auth.users`) with public metadata.
   - Primary Key: `user_id` (Foreign Key referencing `auth.users(id) ON DELETE CASCADE`).
2. **`movies`**: Catalogs movie metadata.
   - Primary Key: `movie_id`.
3. **`genres`**: Normalized lookup table of distinct film genres.
   - Primary Key: `genre_id` (Unique constraint on `genre_name`).
4. **`movie_genres`**: Junction table representing the **Many-to-Many (M:N)** relationship between movies and genres.
   - Composite Primary Key: `(movie_id, genre_id)`.
5. **`ratings`**: User rating (1 to 5 stars) and optional text review.
   - Primary Key: `rating_id`.
   - Unique Constraint: `UNIQUE(user_id, movie_id)` enforces that a user can only review a movie once (enables idempotent upserts).
   - Check Constraint: `CHECK (rating >= 1 AND rating <= 5)`.
6. **`watchlists`**: Bookmarked titles per user.
   - Primary Key: `watchlist_id`.
   - Unique Constraint: `UNIQUE(user_id, movie_id)`.
7. **`user_preferences`**: Explicit or computed genre affinity weights.
   - Composite Primary Key: `(user_id, genre_id)`.

### Why 3NF (Third Normal Form)?
- **1NF**: All table columns hold atomic (indivisible) values. No repeating comma-separated lists of genres in the `movies` table.
- **2NF**: All non-key attributes are fully functionally dependent on the entire primary key. In `movie_genres`, neither `movie_id` nor `genre_id` has partial dependencies.
- **3NF**: There are no transitive dependencies ($X \to Y \to Z$). For instance, genre names reside exclusively in `genres` rather than being replicated across 100+ movie records.

---

## 2. Database View: `movie_rating_summary`

### Problem
Calculating average ratings and review counts dynamically on every page load using `AVG()` and `COUNT()` can be repetitive.

### Solution
We encapsulated this aggregation logic into a PostgreSQL View:
```sql
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
    m.movie_id, m.title, m.release_year, m.description, 
    m.poster_url, m.backdrop_url, m.popularity, m.duration_mins, m.director;
```
*Note for Viva*: Explain that a **LEFT JOIN** is critical so that newly added or unrated movies still appear in the view with `average_rating = 0` and `rating_count = 0`.

---

## 3. Indexing & Query Plan Optimization

### Created Indexes
- `idx_movies_title`: B-Tree index on `movies(title)` for fast ILIKE/prefix searches.
- `idx_movies_popularity`: B-Tree index on `movies(popularity DESC)` for trending queries.
- `idx_movie_genres_genre_id`: Foreign key index accelerating genre join lookups.
- `idx_ratings_user_id` and `idx_ratings_movie_id`: Indices on foreign keys to accelerate joins with users and movies.

### Demonstration with `EXPLAIN ANALYZE`
Run this in the Supabase SQL Editor:
```sql
EXPLAIN ANALYZE
SELECT movie_id, title, popularity 
FROM public.movies 
WHERE title ILIKE 'The Dark%';
```
- **Sequential Scan (Seq Scan)** vs **Bitmap Index Scan**:
  With small sample datasets, PostgreSQL query planner may choose Seq Scan if reading the table pages in memory is cheaper than index lookups. As the catalog grows beyond thousands of records, the planner switches to Index Scan, drastically reducing total buffer read costs ($O(\log N)$ instead of $O(N)$).

---

## 4. Row Level Security (RLS) & Access Control

### Security Rules
1. **Public Catalog**: Anyone (guest or authenticated) can read `movies`, `genres`, and `movie_rating_summary`.
2. **Ratings Table**:
   - `SELECT`: Publicly readable.
   - `INSERT / UPDATE / DELETE`: Restricted to `auth.uid() = user_id`. Users cannot tamper with or delete another user's review.
3. **Watchlists Table**:
   - `SELECT`: `USING (auth.uid() = user_id)`. Each user's watchlist is strictly confidential.
   - `INSERT / DELETE`: Restricted to `auth.uid() = user_id`.

---

## 5. Recommendation Engine Mathematics

CineMatch combines two complementary techniques:

### Method 1: Content-Based Filtering
For users with at least one movie rating $\ge 4$:
1. Identify all genres $G$ linked to movies the user rated $\ge 4$ stars.
2. Calculate Genre Affinity Weight $GA(g)$:
   - $+5$ for 5-star ratings, $+3$ for 4-star ratings, $+1$ for 3-star ratings, $-2$ for $<3$ stars.
3. Candidate movies are selected where $\text{movie\_id} \notin \text{user\_rated\_movies}$.
4. Movie Scoring Formula:
   $$\text{FinalScore} = (0.50 \times S_{\text{genre}}) + (0.30 \times S_{\text{rating}}) + (0.20 \times S_{\text{popularity}})$$
   - $S_{\text{genre}}$: Normalized genre match score ($0-10$).
   - $S_{\text{rating}}$: Community average rating $\times 2$ ($0-10$).
   - $S_{\text{popularity}}$: Scaled popularity metric ($0-10$).

### Method 2: Popularity-Based Fallback
For new users or guests without rating history:
$$\text{Score} = (0.60 \times \text{Popularity}) + (0.40 \times \text{AverageRating} \times 20)$$
Provides immediate, high-quality discovery without requiring cold-start data.

---

## 6. Top Viva Questions & Answers

**Q1: Why did you use a junction table (`movie_genres`)?**  
*Answer:* A single movie can have multiple genres (e.g., Inception is Action, Sci-Fi, and Thriller), and a single genre contains many movies. This is a Many-to-Many relationship. A junction table decomposes this into two 1:N relationships, preventing data redundancy and multi-valued attribute anomalies (violating 1NF).

**Q2: How does CineMatch prevent a user from rating the same movie twice?**  
*Answer:* We defined a composite UNIQUE constraint `CONSTRAINT unique_user_movie_rating UNIQUE (user_id, movie_id)`. In PostgreSQL, any attempt to insert a duplicate record triggers an error or triggers an `ON CONFLICT (user_id, movie_id) DO UPDATE` upsert operation.

**Q3: How are passwords stored and secured?**  
*Answer:* Passwords are handled through Supabase Auth (utilizing bcrypt hashing with high work factors and salting). Plaintext passwords never enter the application tables or frontend state. Frontend operations interact only through JWT tokens and Row Level Security policies.

**Q4: What is the benefit of using a database view?**  
*Answer:* Views simplify query complexity on the frontend, encapsulate calculations (like `AVG()` and `COUNT()`), improve security by shielding underlying tables, and allow the database query engine to optimize query execution internally.
