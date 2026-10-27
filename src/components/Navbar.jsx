import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Film,
  Compass,
  Sparkles,
  Bookmark,
  ShieldAlert,
  User,
  LogOut,
  LogIn,
  Menu,
  X,
  Database,
  Search,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DatabaseNoticeModal from './DatabaseNoticeModal';

export default function Navbar() {
  const { user, profile, isAdmin, signOut, loginAsDemoStudent, isSupabaseConfigured } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [dbModalOpen, setDbModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
      isActive
        ? 'text-amber-400 bg-amber-500/10'
        : 'text-neutral-300 hover:text-white hover:bg-white/5'
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group select-none">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-[#0d0f15] rounded-[10px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none text-white font-['Outfit']">
                  CINE<span className="text-amber-400">MATCH</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium font-sans">
                  Movie Discovery
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/discover" className={navLinkClass}>
                <Compass className="w-4 h-4" />
                Discover
              </NavLink>
              <NavLink to="/recommendations" className={navLinkClass}>
                <Sparkles className="w-4 h-4 text-amber-400" />
                Recommendations
              </NavLink>
              <NavLink to="/watchlist" className={navLinkClass}>
                <Bookmark className="w-4 h-4" />
                My Watchlist
              </NavLink>
              {isAdmin && (
                <NavLink to="/admin" className={navLinkClass}>
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Admin
                </NavLink>
              )}
            </nav>
          </div>

          {/* Search, DB Status & User Section */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-60 pl-9 pr-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:w-64 transition-all"
              />
            </form>

            {/* Database Status Pill */}
            <button
              onClick={() => setDbModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300"
              title="Click to view ADBMS Database Architecture & Schema"
            >
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  isSupabaseConfigured ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              <span className="hidden sm:inline">
                {isSupabaseConfigured ? 'PostgreSQL' : 'ADBMS Demo Mode'}
              </span>
              <Database className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {/* User Dropdown / Login Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full bg-white/5 border border-white/10 hover:border-amber-500/40 transition-colors"
                >
                  <span className="text-xs font-semibold text-neutral-200 max-w-[110px] truncate hidden sm:inline">
                    {profile?.username || user.email?.split('@')[0]}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                    {(profile?.username || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 pr-1" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl glass-dropdown shadow-2xl py-2 z-50 animate-fade-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs text-neutral-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">
                        {profile?.username || user.email}
                      </p>
                      {isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
                          Administrator
                        </span>
                      )}
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4 text-neutral-400" />
                      User Profile & Preferences
                    </Link>

                    <Link
                      to="/watchlist"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-neutral-400" />
                      Saved Watchlist
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-rose-300 hover:bg-rose-500/10 transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                        Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-white/10 my-1" />

                    {/* Quick Demo Student Switch for college viva evaluation */}
                    <button
                      type="button"
                      onClick={() => {
                        loginAsDemoStudent();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-amber-300 hover:bg-amber-500/10 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Reset to Demo Student (Admin)
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-200 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black transition-colors shadow-md shadow-amber-500/20"
                >
                  Join Free
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-2 pb-4 space-y-2">
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400"
              />
            </form>

            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/discover"
              onClick={() => setMobileMenuOpen(false)}
              className={navLinkClass}
            >
              <Compass className="w-4 h-4" />
              Discover Movies
            </NavLink>
            <NavLink
              to="/recommendations"
              onClick={() => setMobileMenuOpen(false)}
              className={navLinkClass}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Personalized Recommendations
            </NavLink>
            <NavLink
              to="/watchlist"
              onClick={() => setMobileMenuOpen(false)}
              className={navLinkClass}
            >
              <Bookmark className="w-4 h-4" />
              My Watchlist
            </NavLink>

            {isAdmin && (
              <NavLink
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={navLinkClass}
              >
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Admin Dashboard
              </NavLink>
            )}

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  loginAsDemoStudent();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-left text-xs font-semibold text-amber-300 bg-amber-500/10 rounded-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Demo Viva Account (Admin)
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Database Schema & Viva Modal */}
      <DatabaseNoticeModal isOpen={dbModalOpen} onClose={() => setDbModalOpen(false)} />
    </>
  );
}
