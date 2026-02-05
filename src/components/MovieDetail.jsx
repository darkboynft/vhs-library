import React, { useEffect } from 'react';

const MovieDetail = ({ movie, onClose, onNext, onPrev }) => {
    if (!movie) return null;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onNext, onPrev, onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="nav-button prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
                <svg viewBox="0 0 32 32"><path d="M20 8l-8 8 8 8" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
            </div>

            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="movie-detail-container">
                    <div className="poster-container">
                        <img
                            src={movie.poster || '/no-poster.png'}
                            alt={movie.title}
                            className="detail-poster"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/no-poster.png';
                            }}
                        />
                    </div>

                    <div className="detail-info">
                        <h2>{movie.title}</h2>

                        <div className="detail-meta">
                            <div className="meta-item">
                                <span className="meta-label">DIRECTOR:</span>
                                <span className="meta-value">{movie.director}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">AÑO:</span>
                                <span className="meta-value">{movie.year}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">CATEGORÍA:</span>
                                <span className="meta-value">{movie.category} ({movie.subCategory})</span>
                            </div>
                        </div>

                        <div className="detail-cast">
                            <h3>REPARTO</h3>
                            <div className="cast-list">
                                {movie.cast && movie.cast.length > 0 ? (
                                    movie.cast.map((actor, i) => (
                                        <span key={i} className="cast-badge">{actor}</span>
                                    ))
                                ) : (
                                    <span className="meta-value">Información no disponible</span>
                                )}
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', color: '#666', fontSize: '0.8rem', fontStyle: 'italic' }}>
                            REPRODUCIENDO... VHS_TRACK_01
                        </div>
                    </div>
                </div>
            </div>

            <div className="nav-button next" onClick={(e) => { e.stopPropagation(); onNext(); }}>
                <svg viewBox="0 0 32 32"><path d="M12 8l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
            </div>
        </div>
    );
};

export default MovieDetail;
