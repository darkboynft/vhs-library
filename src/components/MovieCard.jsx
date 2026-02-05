import React from 'react';

const MovieCard = ({ movie, onClick }) => {
    return (
        <div className="movie-card" onClick={() => onClick(movie)}>
            <img
                src={movie.poster || '/no-poster.png'}
                alt={movie.title}
                className="movie-poster"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/no-poster.png';
                }}
            />
            <div className="movie-info-mini">
                <div className="movie-title">{movie.title.toUpperCase()}</div>
                <div style={{ fontSize: '0.7rem', color: '#aaa' }}>{movie.year}</div>
            </div>
        </div>
    );
};

export default MovieCard;
