import React from 'react';

const FoodItem = ({ name, description, imageUrl, price }) => {
  return (
    <div className="card w-100 h-100 shadow-sm">
      <img
        src={imageUrl}
        className="card-img-top"
        alt={name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text text-muted flex-grow-1">{description}</p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="fw-bold">&#8377;{price}</span>
          <button className="btn btn-primary btn-sm">View</button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
