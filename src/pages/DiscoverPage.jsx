import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, Loader2, Film, RefreshCw, X } from 'lucide-react';
import { movieService } from '../services/movieService';
import MovieCard from '../components/MovieCard';

export default function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filters state initialized from URL search params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genreId') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'popularity');

  // Load Genres once
  useEffect(() => {
    movieService.getGenres().then(setGenres).catch(console.error);
  }, []);

  // Sync state with URL params
  useEffect(() => {
    const qSearch = searchParams.get('search') || '';
    const qGenre = searchParams.get('genreId') || 'all';
    const qSort = searchParams.get('sortBy') || 'popularity';

    setSearch(qSearch);
    setSelectedGenre(qGenre);
    setSortBy(qSort);

    loadMovies(qSearch, qGenre, qSort);
  }, [searchParams]);

  // Debounced search when user types
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentParam = searchParams.get('search') || '';
      if (search !== currentParam) {
        updateFilters(search, selectedGenre, sortBy);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);


  const loadMovies = async (searchQuery, genreId, sort) => {
    try {
      setLoading(true);
      const res = await movieService.getMovies({
        search: searchQuery,
        genreId: genreId === 'all' ? null : genreId,
        sortBy: sort,
        page: 1,
        limit: 48,
      });
      setMovies(res.movies || []);
      setTotalCount(res.total || 0);
    } catch (err) {
      console.error('Error fetching movies in discover:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newSearch, newGenre, newSort) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newGenre && newGenre !== 'all') params.set('genreId', newGenre);
    if (newSort && newSort !== 'popularity') params.set('sortBy', newSort);
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters(search, selectedGenre, sortBy);
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedGenre('all');
    setSortBy('popularity');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
          Discover Movies
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Explore our complete catalog of {totalCount || '100+'} movies with multi-criteria SQL filtering.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="p-4 rounded-2xl bg-[#141622] border border-white/5 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title or director..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  updateFilters('', selectedGenre, sortBy);
                }}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Genre Filter */}
          <div className="md:col-span-4 relative">
            <Filter className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
            <select
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                updateFilters(search, e.target.value, sortBy);
              }}
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 appearance-none cursor-pointer transition-colors"
            >
              <option value="all">All Genres ({genres.length})</option>
              {genres.map((g) => (
                <option key={g.genre_id} value={g.genre_id}>
                  {g.genre_name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3 relative">
            <ArrowUpDown className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                updateFilters(search, selectedGenre, e.target.value);
              }}
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 appearance-none cursor-pointer transition-colors"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="year_desc">Newest First</option>
              <option value="year_asc">Oldest First</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Active Filter Pills and Results Counter */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-white">{movies.length}</strong> of{' '}
              <strong className="text-white">{totalCount}</strong> movies
            </span>
            {(search || selectedGenre !== 'all' || sortBy !== 'popularity') && (
              <button
                onClick={handleClearFilters}
                className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 ml-2"
              >
                <RefreshCw className="w-3 h-3" /> Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Movie Grid / Loading / Empty States */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-xs text-neutral-400">Querying database records...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center p-8 bg-[#141622] rounded-2xl border border-white/5">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 mb-4">
            <Film className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No Movies Found</h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-sm">
            We couldn't find any movie matching your search criteria. Try adjusting your genre or search term.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.movie_id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
