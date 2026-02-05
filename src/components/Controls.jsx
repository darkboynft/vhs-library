import React from 'react';

const Controls = ({ searchTerm, setSearchTerm, filter, setFilter, sortBy, setSortBy, categories }) => {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="BUSCAR TÍTULO, DIRECTOR, REPARTO..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="glitch-on-hover"
      />
      
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">TODAS LAS CATEGORÍAS</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat.toUpperCase()}</option>
        ))}
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="title">ORDEN ALFABÉTICO</option>
        <option value="year">AÑO (MÁS RECIENTE)</option>
        <option value="year-asc">AÑO (MÁS ANTIGUO)</option>
        <option value="director">DIRECTOR</option>
        <option value="category">CATEGORÍA</option>
      </select>
    </div>
  );
};

export default Controls;
