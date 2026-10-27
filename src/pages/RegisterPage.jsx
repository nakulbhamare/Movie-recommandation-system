import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, UserPlus, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { signUp, loginAsDemoStudent, user } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await signUp(email.trim(), password, username.trim(), fullName.trim());
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#141622] rounded-2xl border border-white/10 p-8 shadow-2xl relative">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-3">
            <Film className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white font-['Outfit']">
            Join CineMatch
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Create an account to start receiving personalized movie recommendations.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Username <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. cinelover"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Alex Taylor"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Email Address <span className="text-amber-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Password (min 6 characters) <span className="text-amber-400">*</span>
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

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Confirm Password <span className="text-amber-400">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            Register Account
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={() => {
              loginAsDemoStudent();
              navigate('/');
            }}
            className="text-xs text-amber-300 hover:text-amber-200 inline-flex items-center gap-1 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Or use Demo Student Profile
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-neutral-400">
          Already registered?{' '}
          <Link to="/login" className="text-amber-400 hover:underline font-semibold">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
