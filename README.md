# CineMatch – Movie Recommendation System
> **Advanced Database Management System (ADBMS) Mini-Project**  
> *Tagline: Discover Your Next Favorite Movie.*

![CineMatch Banner](https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80)

---

## 1. Project Introduction
**CineMatch** is a full-featured, cinematic web application built as an undergraduate Advanced Database Management System (ADBMS) mini-project. It combines relational database design in PostgreSQL with a responsive React frontend to deliver personalized movie recommendations based on user genre preferences, community ratings, and popularity trends.

Designed to be beginner-friendly yet technically robust for college viva evaluation, CineMatch avoids complex machine-learning dependencies and instead implements transparent, highly demonstrable relational database principles and algorithms.

---

## 2. Project Objectives
* **Demonstrate Practical ADBMS Concepts**: Implement 3NF normalization, junction tables, multi-table joins, aggregate functions, database views, B-Tree indexes, query execution analysis (`EXPLAIN ANALYZE`), and Row Level Security (RLS).
* **Personalized Recommendations**: Deliver transparent recommendations using Content-Based Filtering and Popularity-Based scoring.
* **Interactive Discovery**: Provide live multi-criteria title searches, genre filtering, star ratings (1–5 stars), and private user watchlists.
* **Security & Isolation**: Enforce role-based access control and user data confidentiality with Supabase Auth and PostgreSQL policies.
* **Zero-Friction Evaluation**: Feature an out-of-the-box **Demo / Viva Mode** pre-seeded with 119 movies and instant student login, while enabling seamless connection to a live PostgreSQL Supabase database via `.env`.

---

## 3. Technologies Used
* **Frontend**: React 19 with Vite 8.
* **Styling**: Tailwind CSS (v4) with dark cinematic theme and custom glassmorphism.
* **Icons**: Lucide React.
* **Routing**: React Router DOM (v7).
* **Database**: PostgreSQL (hosted via Supabase).
* **Authentication**: Supabase Auth (JWT & Bcrypt).
* **Backend Client**: Supabase JavaScript Client (`@supabase/supabase-js`).
* **Deployment Target**: Vercel.

---

## 4. Features

### A. Home Page
* Dynamic **Featured Hero Presentation** with high-resolution backdrop and quick actions.
* **Recommended For You** row showcasing personalized candidate movies with explanations.
* **Trending Movies** sorted by popularity index.
* **Browse By Genre** grid linking directly to filtered discovery.
* **Top Rated Cinema** based on community ratings.

### B. Discover Movies Page
* **Title & Director Search**: Instant debounced searching.
* **Genre Filter**: Filter across 12 unique genres.
* **Multi-Criteria Sorting**: By Popularity, Highest Rated, Newest, Oldest, or Alphabetical.
* Responsive movie cards with poster error fallbacks.

### C. Movie Details Page
* Comprehensive movie information: Title, year, runtime, director, synopsis, and primary genres.
* Aggregated community score calculated via the `movie_rating_summary` view.
* **Interactive 1–5 Star Rating & Review Form**: Allows authenticated users to submit or update their ratings (enforced via unique constraint).
* **Community Reviews List**: Displays verified user reviews and dates.
* **Similar Movies Carousel**: Recommends related films with matching genres.

### D. Personalized Recommendations Page
* Educational scoring formula breakdown for college presentations.
* Top 10 recommendations with explicit reasons (e.g., *"Recommended because you enjoy Sci-Fi & Action movies"*).
* Content-Based filtering for rated users and Popularity-Based fallback for new users.

### E. My Watchlist Page
* Private bookmarking collection protected by PostgreSQL Row Level Security.
* One-click add/remove actions with animated feedback.

### F. Authentication & User Profile
* Registration, Login, and Sign Out via Supabase Auth.
* **Instant Demo Student Login**: Pre-authenticates with student admin credentials for swift viva demonstration.
* User profile page summarizing movies rated, watchlist counts, and user ID.

### G. Administration Dashboard
* **Strict Authorization**: Non-admins are blocked with a `403 Forbidden` response.
* System-wide metrics: Total movies (119), registered users, total ratings, and platform average score.
* **Genre Distribution Bar Charts**: Calculated using `COUNT(*)` and `GROUP BY`.
* **Top-Rated Movies Table**: Sourced from the `movie_rating_summary` view.

---

## 5. Database Schema
The database schema is structured into 7 normalized relational tables and 1 database view:

```
                    ┌───────────────────────────┐
                    │       auth.users          │
                    └─────────────┬─────────────┘
                                  │ (1:1)
                                  ▼
                    ┌───────────────────────────┐
                    │      user_profiles        │
                    │───────────────────────────│
                    │ PK user_id (UUID)         │
                    │    username               │
                    │    full_name              │
                    │    is_admin               │
                    │    created_at             │
                    └─────────────┬─────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         │ (1:N)                  │ (1:N)                  │ (1:N)
         ▼                        ▼                        ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│     ratings      │    │    watchlists    │    │ user_preferences │
│──────────────────│    │──────────────────│    │──────────────────│
│ PK rating_id     │    │ PK watchlist_id  │    │ PK user_id (FK)  │
│ FK user_id       │    │ FK user_id       │    │ PK genre_id (FK) │
│ FK movie_id      │    │ FK movie_id      │    │    pref_score    │
│    rating (1-5)  │    │    added_at      │    └──────────────────┘
│    review        │    └─────────┬────────┘
│    created_at    │              │
└────────┬─────────┘              │
         │                        │
         └────────────┬───────────┘
                      │ (N:1)
                      ▼
       ┌───────────────────────────────┐
       │            movies             │
       │───────────────────────────────│
       │ PK movie_id (SERIAL)          │
       │    title                      │
       │    release_year               │
       │    description                │
       │    poster_url                 │
       │    backdrop_url               │
       │    popularity                 │
       │    duration_mins              │
       │    director                   │
       └──────────────┬────────────────┘
                      │ (1:N)
                      ▼
       ┌───────────────────────────────┐        ┌──────────────────┐
       │         movie_genres          │ (N:1)  │      genres      │
       │───────────────────────────────│───────>│──────────────────│
       │ PK,FK movie_id                │        │ PK genre_id      │
       │ PK,FK genre_id                │        │    genre_name    │
       └───────────────────────────────┘        └──────────────────┘
```

---

## 6. Table Relationships & Constraints
1. **`movies` to `genres`**: Many-to-Many ($M:N$) resolved via junction table `movie_genres`.
2. **`user_profiles` to `ratings`**: One-to-Many ($1:N$). A user can author multiple ratings.
3. **`movies` to `ratings`**: One-to-Many ($1:N$). A movie can receive multiple ratings.
4. **Unique Rating Constraint**: `CONSTRAINT unique_user_movie_rating UNIQUE (user_id, movie_id)` ensures a user cannot submit multiple ratings for the same film.
5. **Rating Range Constraint**: `CHECK (rating >= 1 AND rating <= 5)`.
6. **Watchlist Constraint**: `CONSTRAINT unique_user_movie_watchlist UNIQUE (user_id, movie_id)` prevents duplicate bookmarks.

---

## 7. Recommendation Algorithm

The recommendation engine implements a two-phase hybrid approach:

### Phase 1: Content-Based Filtering (for Users with Ratings)
1. **Genre Affinity Calculation**:
   For each rating $R$ submitted by the user on movie $M$:
   $$\text{Weight} = \begin{cases} 
   +5 & \text{if } R = 5 \\
   +3 & \text{if } R = 4 \\
   +1 & \text{if } R = 3 \\
   -2 & \text{if } R < 3 
   \end{cases}$$
   The weight is accumulated into each genre linked to movie $M$.

2. **Candidate Exclusion**:
   All movies already reviewed by the user are excluded:
   $$\text{Candidates} = \{ M \in \text{Catalog} \mid M \notin \text{RatedByUser} \}$$

3. **Composite Scoring Formula**:
   For each candidate movie:
   $$\text{FinalScore} = (0.50 \times S_{\text{genre}}) + (0.30 \times S_{\text{rating}}) + (0.20 \times S_{\text{popularity}})$$
   * $S_{\text{genre}}$: Normalized genre affinity score ($0 - 10$).
   * $S_{\text{rating}}$: Community average rating scaled to 10 ($\text{avg\_rating} \times 2$).
   * $S_{\text{popularity}}$: Scaled popularity score ($\frac{\text{popularity} - 60}{4}$).

4. **Ranking & Output**: Candidates are sorted in descending order of $\text{FinalScore}$, returning the top 10 results with tailored rationale.

### Phase 2: Popularity-Based Fallback (Cold Start)
If the user is not logged in or has zero ratings:
$$\text{Score} = (0.60 \times \text{Popularity}) + (0.40 \times \text{AverageRating} \times 20)$$
Returns the top community-acclaimed blockbusters across multiple genres.

---

## 8. ADBMS Concepts Implemented

| Concept | Implementation in CineMatch |
| :--- | :--- |
| **Normalization (1NF–3NF)** | Separated movies, genres, ratings, profiles, and watchlists into distinct relations to eliminate insertion/update/deletion anomalies. |
| **Many-to-Many (M:N) Relationship** | `movie_genres` junction table linking `movies` and `genres`. |
| **Database View** | `movie_rating_summary` view computes live averages and counts using `LEFT JOIN`. |
| **Multi-Table SQL Joins** | Queries joining 3 to 4 tables simultaneously (`movies` + `movie_genres` + `genres` + `ratings`). |
| **Aggregate Functions** | `COUNT()`, `AVG()`, `ROUND()`, `COALESCE()`, and `GROUP BY / HAVING`. |
| **Indexing** | B-Tree indexes on `title`, `release_year`, `popularity`, and foreign keys. |
| **Query Plan Analysis** | Pre-written `EXPLAIN ANALYZE` scripts in `adbms_queries.sql`. |
| **Row Level Security (RLS)** | PostgreSQL policies restricting review mutation and ensuring watchlist confidentiality. |
| **Common Table Expressions (CTE)** | Multi-step SQL query demonstration using `WITH` clause for genre recommendations. |

---

## 9. How to Configure Supabase

1. Navigate to [Supabase](https://supabase.com) and create a free account.
2. Click **New Project** and name it `cinematch-db`.
3. Choose a database password and select your nearest region.
4. Once the project finishes provisioning (~2 minutes), navigate to **Project Settings** $\to$ **API**.
5. Copy your **Project URL** and **Project API Key (anon/public)**.

---

## 10. How to Execute the SQL Schema and Seed Data

1. Open your Supabase Dashboard and click on the **SQL Editor** tab on the left sidebar.
2. Open the file [supabase_schema.sql](supabase_schema.sql) from this project.
3. Paste the contents into the Supabase SQL Editor and click **Run**.
   * *This creates all 7 tables, constraints, views, indexes, and RLS policies.*
4. Next, open [supabase/seed.sql](supabase/seed.sql).
5. Paste the contents into a new query window and click **Run**.
   * *This inserts the 12 genres and 119 curated sample movies with genres mapped.*
6. Open the **Table Editor** in Supabase to verify that `movies`, `genres`, and `movie_genres` contain all records.

---

## 11. How to Configure Environment Variables

Create a `.env` file in the project root (or edit the existing `.env`):

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here
```

> **Note**: If `.env` is left blank or unconfigured, CineMatch automatically runs in **"Demo / Viva Mode"** with the full 119-movie dataset and local persistence, ensuring the project never crashes during an evaluation!

---

## 12. How to Run the Application Locally

### Prerequisites
* Node.js (v18 or higher recommended)
* npm (v9 or higher)

### Installation & Startup
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The application will launch at:
`http://localhost:5173/`

To test the production build:
```bash
npm run build
npm run preview
```

---

## 13. How to Test the Main Features

1. **Verify Home Page**: Observe the featured banner (*Inception*), *Recommended For You*, *Trending*, and *Top Rated* carousels.
2. **Test Search & Filters**: Navigate to `/discover`. Type `Dark` into the search box to view *The Dark Knight*. Switch the genre dropdown to `Action` and sort by `Highest Rated`.
3. **Submit a Rating**: Click any movie card $\to$ scroll down to *Rate This Movie* $\to$ select 5 stars and enter a review $\to$ click *Submit Rating*. Notice the community average score and review count update immediately.
4. **Test Watchlist**: Click the bookmark icon on any card or details page. Navigate to `/watchlist` to view your private collection.
5. **Verify Recommendations**: Click *Recommendations* in the navbar. Observe how the scoring formula adjusts based on the movies you rated 4 or 5 stars.
6. **Admin Dashboard**: Click *Admin* in the navbar. Inspect the live count of movies (119), ratings, platform averages, and genre distribution charts.
7. **Inspect ADBMS Architecture**: Click the status pill in the top-right navbar (*"🟢 PostgreSQL"* or *"🟡 ADBMS Demo Mode"*) to open the live database schema modal.

---

## 14. How to Deploy the Frontend to Vercel

1. Push your CineMatch repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial CineMatch ADBMS release"
   git remote add origin https://github.com/your-username/cinematch.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your `cinematch` GitHub repository.
4. In the **Environment Variables** section, add:
   * `VITE_SUPABASE_URL` = `https://your-project-id.supabase.co`
   * `VITE_SUPABASE_ANON_KEY` = `your-anon-key`
5. Click **Deploy**. Vercel will build and host your application with global CDN caching.

---

## 15. Known Limitations
* **Cold-Start Data**: For new users who have not yet submitted any movie ratings, recommendations rely on popularity and community ratings until they rate at least one film.
* **External Poster Availability**: Movie posters link to standard TMDB CDN endpoints. If an image fails to load due to network filtering, CineMatch automatically renders a stylized SVG fallback poster.
* **Single Admin Role**: Administrator authorization checks for `is_admin = true` on the `user_profiles` relation. For mini-project simplicity, granular permission groups (editor, moderator) are not included.

---

## 16. Project File Structure
```
c:/movie recommandation system/
├── docs/
│   └── ADBMS_VIVA_GUIDE.md      # Viva preparation guide with Q&A
├── public/
│   └── favicon.svg              # Movie clapper favicon
├── scripts/
│   └── generate_seed.js         # Generator for PostgreSQL & JS seed data
├── src/
│   ├── components/
│   │   ├── DatabaseNoticeModal.jsx  # Schema & viva modal
│   │   ├── FallbackPoster.jsx       # SVG fallback poster
│   │   ├── Footer.jsx               # Site footer with ADBMS credits
│   │   ├── HeroBanner.jsx           # Featured presentation banner
│   │   ├── MovieCard.jsx            # Movie card with watchlist toggle
│   │   ├── Navbar.jsx               # Navigation bar & search
│   │   └── StarRating.jsx           # Interactive 1-5 star component
│   ├── context/
│   │   └── AuthContext.jsx          # Supabase Auth & Demo Session state
│   ├── lib/
│   │   ├── mockStore.js             # Local fallback database store
│   │   ├── seedData.js              # 119 curated movie dataset
│   │   └── supabase.js              # Supabase client initializer
│   ├── pages/
│   │   ├── AdminDashboardPage.jsx   # Admin statistics & metrics
│   │   ├── DiscoverPage.jsx         # Search, genre filtering & sorting
│   │   ├── HomePage.jsx             # Hero, trending & recommendations
│   │   ├── MovieDetailsPage.jsx     # Synopsis, reviews & rating form
│   │   ├── NotFoundPage.jsx         # Custom 404 page
│   │   ├── ProfilePage.jsx          # User profile & rating history
│   │   ├── RecommendationsPage.jsx  # Recommendation engine & formulas
│   │   ├── RegisterPage.jsx         # Account registration
│   │   └── WatchlistPage.jsx        # Private user saved movies
│   ├── services/
│   │   ├── adminService.js          # Admin queries & authorization
│   │   ├── movieService.js          # Catalog queries & sorting
│   │   ├── ratingService.js         # Ratings & reviews management
│   │   ├── recommendationService.js # Hybrid recommendation engine
│   │   └── watchlistService.js      # Watchlist bookmarking queries
│   ├── App.jsx                      # Main router & layout
│   ├── index.css                    # Tailwind CSS & design tokens
│   └── main.jsx                     # Vite React entry point
├── supabase/
│   ├── migrations/
│   │   └── 01_schema.sql            # Migration schema
│   └── seed.sql                     # 119 movies seed dataset
├── .env                             # Active environment variables
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
├── adbms_queries.sql                # Demonstration viva SQL queries
├── index.html                       # HTML5 entry with Outfit & Inter fonts
├── package.json                     # NPM packages & scripts
├── supabase_schema.sql              # Complete PostgreSQL schema
├── vite.config.js                   # Vite & Tailwind configuration
└── README.md                        # Documentation
```

---
*Developed for College Advanced Database Management System (ADBMS) Mini-Project.*
