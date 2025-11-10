import React from 'react'
import logo from '../../assets/logo.jpg';
import cart from '../../assets/cart.png'
import { Link } from 'react-router-dom';
const MenuBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <img src={logo} alt="" height={65} width={75} />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mx-3" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/explore">Explore</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to='/contactUs'>Contact Us</Link>
                        </li>
                    </ul>

                    <div className="menubar-right d-flex align-items-center gap-3">
                        <div className="position-relative">
                            <img src={cart} width={40} height={40} alt="" className="position-relative" />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">5</span>
                        </div>
                        <button type="button" className="btn btn-danger ms-4">Log In</button>
                        <button type="button" className="btn btn-outline-danger">Register</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MenuBar