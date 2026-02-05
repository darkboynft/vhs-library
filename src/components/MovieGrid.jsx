import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, onMovieClick }) => {
    return (
        <div className="movie-grid">
            {movies.map((movie, index) => (
                <MovieCard key={`${movie.title}-${index}`} movie={movie} onClick={onMovieClick} />
            ))}
        </div>
    );
};

export default MovieGrid;
