import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const navigate = useNavigate();
    const { foodList, increaseqty, decreaseqty, quantities, removeItem } = useContext(StoreContext);
    const cartItems = foodList.filter(food => quantities[food.id] > 0);

    const subtotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);
    const shipping = subtotal == 0 ? 0.0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    return (
        <div className="container py-4">
            <h1 className="mb-5">Your Food Cart</h1>
            <div className="row">
                <div className="col-lg-8">
                    {
                        cartItems.length == 0 ? (
                            <p> <i class="bi bi-info-circle-fill"></i> Your Cart is Empty</p>
                        ) : (
                            <div className="card mb-4">
                                <div className="card-body">
                                    {
                                        cartItems.map((food) => (
                                            <div
                                                key={food.id}
                                                className="row cart-item py-3 px-2 mb-3 align-items-center border rounded shadow-sm"
                                                style={{ background: "#fafafa" }}
                                            >
                                                <div className="col-md-3 text-center">
                                                    <img
                                                        width='100'
                                                        height='100'
                                                        src={food.imageUrl}
                                                        alt={food.name}
                                                        className="img-fluid rounded"
                                                        style={{ maxHeight: "90px", objectFit: "cover" }}
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <h5 className="mb-1">{food.name}</h5>
                                                    <small className="text-muted">{food.category}</small>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="input-group input-group-sm">
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            type="button"
                                                            onClick={() => decreaseqty(food.id)}
                                                        >
                                                            -
                                                        </button>

                                                        <input
                                                            type="text"
                                                            className="form-control text-center"
                                                            style={{ maxWidth: "60px" }}
                                                            value={quantities[food.id]}
                                                            readOnly
                                                        />

                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            type="button"
                                                            onClick={() => increaseqty(food.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-md-2 text-end">
                                                    <p className="fw-bold mb-1">₹{food.price * quantities[food.id]}</p>

                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(food.id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))

                                    }


                                </div>
                            </div>
                        )
                    }
                    <div className="text-start mb-4">
                        <Link to="/" className="btn btn-outline-danger">
                            <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                        </Link>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card cart-summary">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>&#8377;{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Shipping</span>
                                <span>&#8377;{shipping.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tax</span>
                                <span>&#8377;{tax.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <strong>Total</strong>
                                <strong>&#8377;{total.toFixed(2)}</strong>
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                disabled={cartItems.length === 0}
                                onClick={() => navigate("/placeOrder")}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart