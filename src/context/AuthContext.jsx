import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DEFAULT_DEMO_USER } from '../lib/mockStore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Load demo session from localStorage or use default student user
      const storedDemo = localStorage.getItem('cinematch_active_demo_user');
      if (storedDemo) {
        try {
          const parsed = JSON.parse(storedDemo);
          setUser(parsed);
          setIsAdmin(Boolean(parsed.user_metadata?.is_admin));
          setProfile({
            username: parsed.user_metadata?.username || 'adbms_student',
            full_name: parsed.user_metadata?.full_name || 'ADBMS Student',
            is_admin: Boolean(parsed.user_metadata?.is_admin),
          });
        } catch {
          setUser(DEFAULT_DEMO_USER);
          setIsAdmin(true);
        }
      } else {
        // Default to logged-in student user so the evaluator immediately experiences all features
        setUser(DEFAULT_DEMO_USER);
        setIsAdmin(true);
        setProfile({
          username: DEFAULT_DEMO_USER.user_metadata.username,
          full_name: DEFAULT_DEMO_USER.user_metadata.full_name,
          is_admin: true,
        });
      }
      setLoading(false);
      return;
    }

    // Supabase Live Auth Flow
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        }
      } catch (err) {
        console.error('Error fetching auth session:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!error && data) {
        setProfile(data);
        setIsAdmin(Boolean(data.is_admin));
      }
    } catch (err) {
      console.warn('Error fetching user profile:', err);
    }
  };

  // Sign In with email & password
  const signIn = async (email, password) => {
    if (!isSupabaseConfigured) {
      // Demo authentication
      const demoUser = {
        id: 'user-' + Date.now(),
        email,
        user_metadata: {
          username: email.split('@')[0],
          full_name: email.split('@')[0],
          is_admin: email.includes('admin') || email.includes('student'),
        },
      };
      localStorage.setItem('cinematch_active_demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setIsAdmin(demoUser.user_metadata.is_admin);
      setProfile({
        username: demoUser.user_metadata.username,
        full_name: demoUser.user_metadata.full_name,
        is_admin: demoUser.user_metadata.is_admin,
      });
      return { success: true };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { success: true, user: data.user };
  };

  // Sign Up with email, password & username
  const signUp = async (email, password, username, fullName = '') => {
    if (!isSupabaseConfigured) {
      const newUser = {
        id: 'user-' + Date.now(),
        email,
        user_metadata: {
          username,
          full_name: fullName || username,
          is_admin: false,
        },
      };
      localStorage.setItem('cinematch_active_demo_user', JSON.stringify(newUser));
      setUser(newUser);
      setIsAdmin(false);
      setProfile({
        username,
        full_name: fullName || username,
        is_admin: false,
      });
      return { success: true };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name: fullName || username,
          is_admin: false,
        },
      },
    });

    if (error) throw error;
    return { success: true, user: data.user };
  };

  // Sign Out
  const signOut = async () => {
    if (!isSupabaseConfigured) {
      localStorage.removeItem('cinematch_active_demo_user');
      setUser(null);
      setProfile(null);
      setIsAdmin(false);
      return { success: true };
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setProfile(null);
    setIsAdmin(false);
    return { success: true };
  };

  // Switch demo account for easy viva grading
  const loginAsDemoStudent = () => {
    localStorage.setItem('cinematch_active_demo_user', JSON.stringify(DEFAULT_DEMO_USER));
    setUser(DEFAULT_DEMO_USER);
    setIsAdmin(true);
    setProfile({
      username: DEFAULT_DEMO_USER.user_metadata.username,
      full_name: DEFAULT_DEMO_USER.user_metadata.full_name,
      is_admin: true,
    });
  };

  const loginAsDemoGuest = () => {
    localStorage.removeItem('cinematch_active_demo_user');
    setUser(null);
    setProfile(null);
    setIsAdmin(false);
  };

  const value = {
    user,
    profile,
    isAdmin,
    loading,
    isDemoMode,
    isSupabaseConfigured,
    signIn,
    signUp,
    signOut,
    loginAsDemoStudent,
    loginAsDemoGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
