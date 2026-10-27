import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, LogIn, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { signIn, loginAsDemoStudent, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  React.useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      await signIn(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemoStudent();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#141622] rounded-2xl border border-white/10 p-8 shadow-2xl relative">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-3">
            <Film className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white font-['Outfit']">
            Sign In to CineMatch
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Access your personalized recommendations and private watchlist.
          </p>
        </div>

        {/* Quick Demo Login Pill for Examiner / Viva */}
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Instant College Viva Demo</span>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            Click below to instantly log in as the pre-configured <strong>ADBMS Student (Admin)</strong> with ratings and watchlist data.
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md shadow-amber-500/20"
          >
            One-Click Login as Demo Student
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative px-3 bg-[#141622] text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
            Or With Email & Password
          </span>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@cinematch.edu"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-400">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-amber-400 hover:underline font-semibold">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
