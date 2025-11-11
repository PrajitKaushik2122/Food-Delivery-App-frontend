import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div
      className="p-5 mb-4 rounded-3 mt-1"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 0,
        }}
      ></div>

      <div className="container-fluid py-5 position-relative" style={{ zIndex: 1 }}>
        <h1 className="display-5 fw-bold">Order your favourite food here</h1>
        <p className="col-md-8 fs-4">Discover the best food and drinks in Pune</p>
        <Link to="/explore" className="btn btn-danger btn-lg">
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Header;
