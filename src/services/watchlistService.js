import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockStore } from '../lib/mockStore';

export const watchlistService = {
  // Get all watchlist items for the authenticated user
  async getUserWatchlist(userId) {
    if (!userId) return [];

    if (!isSupabaseConfigured) {
      return mockStore.getUserWatchlist(userId);
    }

    try {
      const { data, error } = await supabase
        .from('watchlists')
        .select(`
          watchlist_id,
          added_at,
          movie_id,
          movies (
            movie_id,
            title,
            release_year,
            poster_url,
            popularity,
            duration_mins,
            director
          )
        `)
        .eq('user_id', userId)
        .order('added_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(item => ({
        watchlist_id: item.watchlist_id,
        added_at: item.added_at,
        movie: item.movies,
      }));
    } catch (err) {
      console.warn('Supabase getUserWatchlist failed, falling back:', err.message);
      return mockStore.getUserWatchlist(userId);
    }
  },

  // Check if a movie is in user's watchlist
  async isInWatchlist(userId, movieId) {
    if (!userId) return false;

    if (!isSupabaseConfigured) {
      return mockStore.isInWatchlist(userId, movieId);
    }

    try {
      const { data, error } = await supabase
        .from('watchlists')
        .select('watchlist_id')
        .eq('user_id', userId)
        .eq('movie_id', movieId)
        .maybeSingle();

      if (error) throw error;
      return Boolean(data);
    } catch (err) {
      console.warn('Supabase isInWatchlist failed:', err.message);
      return mockStore.isInWatchlist(userId, movieId);
    }
  },

  // Add movie to user's watchlist
  async addToWatchlist(userId, movieId) {
    if (!userId) throw new Error('You must be logged in to save to your watchlist.');

    if (!isSupabaseConfigured) {
      mockStore.toggleWatchlist(userId, movieId);
      return true;
    }

    try {
      const { error } = await supabase
        .from('watchlists')
        .insert({
          user_id: userId,
          movie_id: Number(movieId),
        });

      if (error) {
        // If unique constraint triggers, it's already added
        if (error.code === '23505') return true;
        throw error;
      }
      return true;
    } catch (err) {
      console.warn('Supabase addToWatchlist failed:', err.message);
      mockStore.toggleWatchlist(userId, movieId);
      return true;
    }
  },

  // Remove movie from user's watchlist
  async removeFromWatchlist(userId, movieId) {
    if (!userId) return false;

    if (!isSupabaseConfigured) {
      let watchlist = mockStore.getWatchlist();
      watchlist = watchlist.filter(
        w => !(w.user_id === userId && Number(w.movie_id) === Number(movieId))
      );
      mockStore.saveWatchlist(watchlist);
      return true;
    }

    try {
      const { error } = await supabase
        .from('watchlists')
        .delete()
        .eq('user_id', userId)
        .eq('movie_id', movieId);

      if (error) throw error;
      return true;
    } catch (err) {
      console.warn('Supabase removeFromWatchlist failed:', err.message);
      return false;
    }
  },
};
