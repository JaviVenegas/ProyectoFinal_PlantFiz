// frontend/src/pages/ProductDetails.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { plantas } from '../data/data'; // Asegúrate de importar tu data.js correctamente

export const ProductDetails = () => {
  const { id } = useParams(); // Obtiene el id de la URL
  const planta = plantas.find((p) => p.id === id); // Busca la planta en el array

  // Si no se encuentra la planta, muestra un mensaje
  if (!planta) {
    return (
      <div className="error-container">
        <h2>Planta no encontrada 🌱</h2>
        <Link to="/catalog" className="btn-back">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details">
      {/* Botón para regresar */}
      <Link to="/catalog" className="btn-back">
        ← Volver al catálogo
      </Link>

      {/* Contenedor principal */}
      <div className="details-container">
        {/* Imagen de la planta */}
        <img 
          src={`/images/${planta.url}`} // Asume que las imágenes están en public/images
          alt={planta.nombre_planta}
          className="plant-image"
        />

        {/* Información detallada */}
        <div className="plant-info">
          <h1>{planta.nombre_planta}</h1>
          <p className="price">Precio: ${planta.precio}</p>
          <p className="origin">Origen: {planta.origen}</p>
          
          <div className="description">
            <h3>Descripción</h3>
            <p>{planta.descripcion_hojas}</p>
          </div>

          <div className="care-info">
            <h3>Cuidados</h3>
            <p><strong>Ambiente ideal:</strong> {planta.ideal_para}</p>
            <p><strong>Riego:</strong> {planta.agua}</p>
            <p><strong>Luz:</strong> {planta.luz}</p>
          </div>

          <div className="categories">
            <h3>Categorías</h3>
            <ul>
              {planta.categorias.map((categoria, index) => (
                <li key={index}>{categoria}</li>
              ))}
            </ul>
          </div>

          <p className="stock">Stock disponible: {planta.stock}</p>
        </div>
      </div>
    </div>
  );
};