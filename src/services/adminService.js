import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockStore } from '../lib/mockStore';

export const adminService = {
  // Check if current user is an authorized administrator
  async verifyAdminAccess(user) {
    if (!user) return false;

    // Check user_metadata first (e.g. demo user)
    if (user.user_metadata?.is_admin === true) {
      return true;
    }

    if (!isSupabaseConfigured) {
      return Boolean(user.is_admin || user.email === 'student@cinematch.edu');
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('is_admin')
        .eq('user_id', user.id)
        .single();

      if (error) return false;
      return Boolean(data?.is_admin);
    } catch {
      return false;
    }
  },

  // Fetch live database statistics for the dashboard
  async getDashboardStats() {
    if (!isSupabaseConfigured) {
      return mockStore.getAdminStats();
    }

    try {
      // 1. Total movies
      const { count: totalMovies } = await supabase
        .from('movies')
        .select('*', { count: 'exact', head: true });

      // 2. Total ratings and platform average
      const { data: ratingRows } = await supabase
        .from('ratings')
        .select('rating');

      const totalRatings = ratingRows ? ratingRows.length : 0;
      const avgRating = totalRatings > 0
        ? Number((ratingRows.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(2))
        : 0;

      // 3. Total registered users (from user_profiles)
      const { count: totalUsers } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      // 4. Genre statistics
      const { data: genresData } = await supabase
        .from('genres')
        .select('genre_id, genre_name, movie_genres(count)');

      const genreDistribution = (genresData || []).map(g => ({
        name: g.genre_name,
        count: g.movie_genres?.[0]?.count || 0,
      }));

      // 5. Top rated movies from movie_rating_summary
      const { data: topMovies } = await supabase
        .from('movie_rating_summary')
        .select('*')
        .gt('rating_count', 0)
        .order('average_rating', { ascending: false })
        .order('rating_count', { ascending: false })
        .limit(5);

      return {
        totalMovies: totalMovies || 119,
        totalUsers: totalUsers || 1,
        totalRatings,
        avgRating,
        genreDistribution: genreDistribution.length > 0 ? genreDistribution : mockStore.getAdminStats().genreDistribution,
        topRatedMovies: topMovies || mockStore.getAdminStats().topRatedMovies,
      };
    } catch (err) {
      console.warn('Supabase admin stats query failed, falling back:', err.message);
      return mockStore.getAdminStats();
    }
  },
};
