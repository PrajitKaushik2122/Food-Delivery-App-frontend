import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ name, description, id, imageUrl, price }) => {
  const { increaseqty, decreaseqty, quantities } = useContext(StoreContext);

  const qty = quantities[id] || 0;

  return (
    <div className="card w-100 h-100 shadow-sm" style={{ textDecoration: 'none' }}>
      <Link to={`/details/${id}`}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt={name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-muted flex-grow-1">{description}</p>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="fw-bold">&#8377;{price}</span>

          <div className="d-flex align-items-center">
            <Link className="btn btn-primary btn-sm me-2" to={`/details/${id}`}>
              View item
            </Link>
            {qty === 0 ? (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => increaseqty(id)}
              >
                <i className="bi bi-plus-lg text-white"></i>
              </button>
            ) : (
              <div
                className="d-flex align-items-center px-2 py-1"
                style={{
                  background: '#dc3545',
                  border: '1px solid #dc3545',
                  borderRadius: '6px',
                  color: 'white'
                }}
              >
                <button
                  className="btn btn-sm p-0"
                  onClick={() => decreaseqty(id)}
                  style={{ color: 'white' }}
                >
                  <i className="bi bi-dash-lg text-white"></i>
                </button>

                <span className="mx-2 fw-bold text-white">{qty}</span>

                <button
                  className="btn btn-sm p-0"
                  onClick={() => increaseqty(id)}
                  style={{ color: 'white' }}
                >
                  <i className="bi bi-plus-lg text-white"></i>
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
