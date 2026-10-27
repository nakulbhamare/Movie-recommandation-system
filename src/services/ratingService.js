import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockStore } from '../lib/mockStore';

export const ratingService = {
  // Get ratings and reviews for a specific movie
  async getRatingsForMovie(movieId) {
    if (!isSupabaseConfigured) {
      return mockStore.getRatingsForMovie(movieId);
    }
    try {
      const { data, error } = await supabase
        .from('ratings')
        .select(`
          rating_id,
          user_id,
          movie_id,
          rating,
          review,
          created_at,
          updated_at,
          user_profiles(username, full_name, avatar_url)
        `)
        .eq('movie_id', movieId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(r => ({
        ...r,
        username: r.user_profiles?.username || 'Anonymous User',
      }));
    } catch (err) {
      console.warn('Supabase getRatingsForMovie failed:', err.message);
      return mockStore.getRatingsForMovie(movieId);
    }
  },

  // Get current user's rating for this movie
  async getUserRating(userId, movieId) {
    if (!userId) return null;
    if (!isSupabaseConfigured) {
      return mockStore.getUserRating(userId, movieId);
    }
    try {
      const { data, error } = await supabase
        .from('ratings')
        .select('*')
        .eq('user_id', userId)
        .eq('movie_id', movieId)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase getUserRating failed:', err.message);
      return mockStore.getUserRating(userId, movieId);
    }
  },

  // Insert or update rating (1-5 stars) and review
  async submitRating({ userId, movieId, rating, review = '', username = 'User' }) {
    if (!userId) throw new Error('User must be logged in to submit a rating.');

    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5) {
      throw new Error('Rating must be between 1 and 5 stars.');
    }

    if (!isSupabaseConfigured) {
      mockStore.submitRating(userId, movieId, numRating, review, username);
      return { success: true };
    }

    try {
      // Upsert using PostgreSQL unique constraint (user_id, movie_id)
      const { data, error } = await supabase
        .from('ratings')
        .upsert(
          {
            user_id: userId,
            movie_id: Number(movieId),
            rating: numRating,
            review: review.trim() || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,movie_id' }
        )
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Supabase submitRating failed, saving to local store:', err.message);
      mockStore.submitRating(userId, movieId, numRating, review, username);
      return { success: true };
    }
  },

  // Delete user rating
  async deleteRating(userId, movieId) {
    if (!isSupabaseConfigured) {
      const ratings = mockStore.getRatings().filter(
        r => !(r.user_id === userId && Number(r.movie_id) === Number(movieId))
      );
      mockStore.saveRatings(ratings);
      return { success: true };
    }
    try {
      const { error } = await supabase
        .from('ratings')
        .delete()
        .eq('user_id', userId)
        .eq('movie_id', movieId);
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('Supabase deleteRating failed:', err.message);
      return { success: false, error: err.message };
    }
  },
};
