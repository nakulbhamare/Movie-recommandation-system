import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockStore } from '../lib/mockStore';

export const movieService = {
  // Fetch all genres
  async getGenres() {
    if (!isSupabaseConfigured) {
      return mockStore.genres;
    }
    try {
      const { data, error } = await supabase
        .from('genres')
        .select('*')
        .order('genre_name', { ascending: true });
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase getGenres failed, falling back to local store:', err.message);
      return mockStore.genres;
    }
  },

  // Get filtered, searched, and sorted movies
  async getMovies({ search = '', genreId = null, sortBy = 'popularity', page = 1, limit = 24 } = {}) {
    if (!isSupabaseConfigured) {
      let list = mockStore.getMovies();

      if (search.trim()) {
        const q = search.toLowerCase().trim();
        list = list.filter(m => 
          m.title.toLowerCase().includes(q) || 
          (m.director && m.director.toLowerCase().includes(q))
        );
      }

      if (genreId && genreId !== 'all') {
        const gid = Number(genreId);
        list = list.filter(m => (m.genre_ids || []).includes(gid));
      }

      // Sorting
      if (sortBy === 'rating') {
        list.sort((a, b) => b.average_rating - a.average_rating || b.rating_count - a.rating_count);
      } else if (sortBy === 'year_desc') {
        list.sort((a, b) => b.release_year - a.release_year);
      } else if (sortBy === 'year_asc') {
        list.sort((a, b) => a.release_year - b.release_year);
      } else if (sortBy === 'title') {
        list.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        // popularity
        list.sort((a, b) => b.popularity - a.popularity);
      }

      const total = list.length;
      const startIndex = (page - 1) * limit;
      const paginated = list.slice(startIndex, startIndex + limit);

      return {
        movies: paginated,
        total,
        page,
        totalPages: Math.ceil(total / limit) || 1,
      };
    }

    try {
      // In Supabase, we can query movie_rating_summary or movies directly
      let query = supabase
        .from('movie_rating_summary')
        .select('*, movie_genres(genre_id, genres(genre_id, genre_name))', { count: 'exact' });

      if (search.trim()) {
        query = query.ilike('title', `%${search.trim()}%`);
      }

      if (genreId && genreId !== 'all') {
        // Filter by junction table
        query = query.eq('movie_genres.genre_id', Number(genreId));
      }

      // Sort
      if (sortBy === 'rating') {
        query = query.order('average_rating', { ascending: false }).order('rating_count', { ascending: false });
      } else if (sortBy === 'year_desc') {
        query = query.order('release_year', { ascending: false });
      } else if (sortBy === 'year_asc') {
        query = query.order('release_year', { ascending: true });
      } else if (sortBy === 'title') {
        query = query.order('title', { ascending: true });
      } else {
        query = query.order('popularity', { ascending: false });
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;
      if (error) throw error;

      // Map genres structure
      const formatted = (data || []).map(m => ({
        ...m,
        genres: (m.movie_genres || []).map(mg => mg.genres).filter(Boolean),
      }));

      return {
        movies: formatted,
        total: count || formatted.length,
        page,
        totalPages: Math.ceil((count || formatted.length) / limit) || 1,
      };
    } catch (err) {
      console.warn('Supabase getMovies failed, falling back to local store:', err.message);
      // graceful fallback
      return movieService.getMoviesLocal({ search, genreId, sortBy, page, limit });
    }
  },

  getMoviesLocal(params) {
    return mockStore.getMovies(params);
  },

  // Get single movie by ID
  async getMovieById(movieId) {
    if (!isSupabaseConfigured) {
      return mockStore.getMovieById(movieId);
    }
    try {
      const { data, error } = await supabase
        .from('movie_rating_summary')
        .select('*, movie_genres(genre_id, genres(genre_id, genre_name))')
        .eq('movie_id', movieId)
        .single();

      if (error) throw error;

      return {
        ...data,
        genres: (data.movie_genres || []).map(mg => mg.genres).filter(Boolean),
      };
    } catch (err) {
      console.warn(`Supabase getMovieById(${movieId}) error, falling back:`, err.message);
      return mockStore.getMovieById(movieId);
    }
  },

  // Get trending movies (top popularity)
  async getTrendingMovies(limit = 10) {
    const res = await this.getMovies({ sortBy: 'popularity', page: 1, limit });
    return res.movies;
  },

  // Get top rated movies (rating >= 4.0)
  async getTopRatedMovies(limit = 10) {
    const res = await this.getMovies({ sortBy: 'rating', page: 1, limit });
    return res.movies;
  },

  // Get similar movies based on shared genres
  async getSimilarMovies(movieId, genreIds = [], limit = 6) {
    const all = mockStore.getMovies();
    const currentId = Number(movieId);
    const targetGids = new Set(genreIds);

    const candidates = all
      .filter(m => Number(m.movie_id) !== currentId)
      .map(m => {
        const commonCount = (m.genre_ids || []).filter(gid => targetGids.has(gid)).length;
        return {
          ...m,
          commonCount,
        };
      })
      .filter(m => m.commonCount > 0)
      .sort((a, b) => b.commonCount - a.commonCount || b.popularity - a.popularity)
      .slice(0, limit);

    return candidates;
  },
};
