import React, { useState, useMemo } from 'react';
import { movies } from './data/movies';
import MovieGrid from './components/MovieGrid';
import MovieDetail from './components/MovieDetail';
import Controls from './components/Controls';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = useMemo(() => {
    return Array.from(new Set(movies.map(m => m.category)));
  }, []);

  const filteredMovies = useMemo(() => {
    let result = movies.filter(movie => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        movie.title.toLowerCase().includes(searchLower) ||
        movie.director.toLowerCase().includes(searchLower) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchLower)) ||
        movie.category.toLowerCase().includes(searchLower) ||
        movie.subCategory.toLowerCase().includes(searchLower);

      const matchesFilter = filter === 'All' || movie.category === filter;

      return matchesSearch && matchesFilter;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'year-asc') return a.year - b.year;
      if (sortBy === 'director') return a.director.localeCompare(b.director);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

    return result;
  }, [searchTerm, filter, sortBy]);

  const handleNextMovie = () => {
    if (!selectedMovie) return;
    const currentIndex = filteredMovies.findIndex(m => m.title === selectedMovie.title);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % filteredMovies.length;
    setSelectedMovie(filteredMovies[nextIndex]);
  };

  const handlePrevMovie = () => {
    if (!selectedMovie) return;
    const currentIndex = filteredMovies.findIndex(m => m.title === selectedMovie.title);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + filteredMovies.length) % filteredMovies.length;
    setSelectedMovie(filteredMovies[prevIndex]);
  };

  return (
    <>
      <div className="crt-overlay"></div>
      <div className="vhs-tracking"></div>
      <div className="vhs-noise"></div>

      <div className="container">
        <header>
          <h1 className="glitch">LAS PELIS DE FULL</h1>
          <p className="subtitle">BIBLIOTECA VHS PERSONAL - SYSTEM v0.84</p>
        </header>

        <div className="sticky-bar">
          <div className="desktop-only">
            <Controls
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categories={categories}
            />
          </div>
        </div>

        <MovieGrid movies={filteredMovies} onMovieClick={setSelectedMovie} />
      </div>

      {/* Mobile Filter Button */}
      <button className="mobile-filter-btn" onClick={() => setShowMobileFilters(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '24px', fill: '#000' }}>
          <path d="M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z" />
        </svg>
      </button>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="modal-overlay" onClick={() => setShowMobileFilters(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowMobileFilters(false)}>&times;</button>
            <h2 style={{ color: 'var(--neon-blue)', marginBottom: '1.5rem' }}>FILTROS Y BÚSQUEDA</h2>
            <Controls
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categories={categories}
            />
            <button
              className="glitch-on-hover"
              style={{ width: '100%', marginTop: '2rem', padding: '1rem', background: 'var(--neon-blue)', color: '#000', border: 'none', fontWeight: 'bold' }}
              onClick={() => setShowMobileFilters(false)}
            >
              APLICAR
            </button>
          </div>
        </div>
      )}

      <MovieDetail
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onNext={handleNextMovie}
        onPrev={handlePrevMovie}
      />

      <footer style={{ textAlign: 'center', padding: '2rem', color: '#444', fontSize: '0.8rem' }}>
        &copy; 198X FULL ENTERTAINMENT - GRABADO EN MODO SP
      </footer>
    </>
  );
}

export default App;
