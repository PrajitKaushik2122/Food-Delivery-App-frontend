import React, { useContext } from 'react';
import logo from '../../assets/logo.jpg';
import cart from '../../assets/cart.png';
import { Link, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const MenuBar = () => {
    const { quantities } = useContext(StoreContext);
    const uniqueItems = Object.values(quantities).filter(qty => qty > 0).length;

    const location = useLocation();   // <-- get current route
    const currentPath = location.pathname;

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div className="container">

                {/* Logo + Title */}
                <div className="d-flex align-items-center">
                    <Link to="/">
                        <img src={logo} alt="Logo" height={65} width={75} className="me-2" />
                    </Link>
                    <h4
                        className="m-0"
                        style={{
                            fontFamily: "'Pacifico', cursive",
                            color: "#dc3545",
                            fontSize: "1.8rem"
                        }}
                    >
                        Foodies Delivery
                    </h4>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse mx-3" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {/* Home */}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${currentPath === "/" ? "active fw-bold text-danger" : ""}`}
                                to="/"
                            >
                                Home
                            </Link>
                        </li>

                        {/* Explore */}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${currentPath === "/explore" ? "active fw-bold text-danger" : ""}`}
                                to="/explore"
                            >
                                Explore
                            </Link>
                        </li>

                        {/* Contact */}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${currentPath === "/contactUs" ? "active fw-bold text-danger" : ""}`}
                                to="/contactUs"
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>

                    <div className="menubar-right d-flex align-items-center gap-3">
                        <Link to='/Cart' className="position-relative">
                            <img src={cart} width={40} height={40} alt="Cart" />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                                {uniqueItems}
                            </span>
                        </Link>
                        <button type="button" className="btn btn-danger ms-4">Log In</button>
                        <button type="button" className="btn btn-outline-danger">Register</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MenuBar;
