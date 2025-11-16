import React from "react";
import './placeOrder.css'

const PlaceOrder = () => {
  return (
    <div className="container py-5">
      <div className="row">

        {/* CART SUMMARY */}
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your Cart</span>
            <span className="badge bg-secondary rounded-pill">3</span>
          </h4>

          <ul className="list-group mb-3 shadow-sm">
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <h6 className="my-0">Product name</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$12</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <div>
                <h6 className="my-0">Second product</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$8</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <div>
                <h6 className="my-0">Third product</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$5</span>
            </li>



            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>&#8377;20</strong>
            </li>
          </ul>
        </div>

        {/* BILLING FORM */}
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing Address</h4>

          <form className="needs-validation">

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" required />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" required />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                Email
              </label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" required />
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
            </div>

            <div className="mb-3">
              <label htmlFor="address2">
                Address 2 <span className="text-muted">(Optional)</span>
              </label>
              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className="form-select" id="country" required>
                  <option value="">Choose...</option>
                  <option>India</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className="form-select" id="state" required>
                  <option value="">Choose...</option>
                  <option>Pune</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" required />
              </div>
            </div>

            <hr className="my-4" />

            <button className="btn btn-success w-100 btn-lg" type="submit">
              Continue to Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
