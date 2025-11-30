import React, { useState } from "react";
import './placeOrder.css'
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// Refactored PlaceOrder component
export default function PlaceOrder() {
  const {
    foodList,
    increaseqty,
    decreaseqty,
    quantities,
    removeItem,
    token,
    setQuantities // assume your StoreContext exposes this (commonly present)
  } = useContext(StoreContext);

  const cartItems = foodList.filter(food => quantities[food.id] > 0);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    zipcode: ''
  });

  // store order id returned from backend so we can delete it if payment is cancelled
  const [createdOrderId, setCreatedOrderId] = useState(null);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  const subtotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);
  const shipping = subtotal === 0 ? 0.0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  // helper: dynamically load Razorpay script if not loaded
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window && window.Razorpay) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Razorpay SDK failed to load.'));
      document.body.appendChild(script);
    });
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    const orderData = {
      userAddress: `${data.firstName} ${data.lastName} ${data.address} ${data.city} ${data.zipcode}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map(item => ({
        foodId: item.foodId,
        qty: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name
      })),
      amount: total,
      orderStatus: 'Preparing'
    };

    try {
      const response = await fetch('http://localhost:8080/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.status === 201 || response.ok) {
        const respData = await response.json();
        // save created order id so we can cancel if needed
        if (respData.id) setCreatedOrderId(respData.id);

        if (respData.razorpayId) {
          // ensure the script is loaded then open checkout
          try {
            await loadRazorpayScript();
            await initiatePayment(respData);
          } catch (err) {
            toast.error(err.message || 'Unable to load payment gateway.');
          }
        } else {
          toast.error('Payment initiation failed: missing razorpay order id');
        }
      } else {
        const errText = await response.text().catch(() => 'Unable to create order');
        toast.error(errText || 'Unable to process please try again');
      }
    } catch (error) {
      console.error(error);
      toast.error('Unable to process please try again');
    }
  }

  const initiatePayment = async (order) => {
    const options = {
      key: "rzp_test_Rj9eOeBiJTyZjr",
      amount: Math.round(order.amount * 100),
      currency: "INR",
      name: "Food Land",
      description: "Food payment",
      order_id: order.razorpayId,
      handler: async function (razorpayResponse) {
        await verifyPayment(razorpayResponse);
      },
      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber
      },
      theme: { color: "#3399cc" },
      modal: {
        ondismiss: async function () {
          toast.error("Payment Cancelled.");
          if (order.id) await deleteOrder(order.id);
        }
      }
    };

    // window.Razorpay is available because we ensure loadRazorpayScript ran earlier
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  const verifyPayment = async (razorpayResponse) => {
    console.log(razorpayResponse)
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature
    };

    try {
      const response = await fetch("http://localhost:8080/api/orders/verify", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData)
      });

      if (response.ok) {
        toast.success("Payment successful");
        // clear client-side cart

        try {
          const clearCartRes = await fetch("http://localhost:8080/api/cart/clear", {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });

          if (clearCartRes.status === 204) {
            setQuantities({});
          } else {
            toast.error("Error clearing cart");
          }
        } catch (err) {
          console.error(err);
          toast.error("Error clearing cart on server");
        }

        navigate('/myorders');
      } else {
        const txt = await response.text().catch(() => 'Payment failed.');
        toast.error(txt || 'Payment failed. please try again');
        navigate('/myorders');
      }
    } catch (error) {
      toast.error('Payment failed. please try again');
    }
  }

  const deleteOrder = async (orderId) => {
    if (!orderId) return;
    try {
      const res = await fetch(`http://localhost:8080/api/orders/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE'
      });

      if (!res.ok) {
        console.warn('Failed to delete order', await res.text().catch(() => ''));
      }
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    }
  }

  return (
    <div className="container py-5">
      <div className="row">

        {/* CART SUMMARY */}
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3 px-3">
            <span className="text-muted">Order Summary</span>
            <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
          </h4>

          <ul className="list-group mb-3 shadow-sm">
            {
              cartItems.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-muted">Qty: {quantities[item.id]}</small>
                  </div>
                  <span className="text-muted">₹{item.price * quantities[item.id]}</span>
                </li>
              ))
            }
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <h6 className="my-0">Shipping cost</h6>
                <small className="text-muted"></small>
              </div>
              <span className="text-muted">₹{shipping}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <h6 className="my-0">Tax</h6>
                <small className="text-muted">10% of your subtotal</small>
              </div>
              <span className="text-muted">₹{tax}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>₹{total}</strong>
            </li>
          </ul>
        </div>

        {/* BILLING FORM */}
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing Address</h4>

          <form className="needs-validation" onSubmit={onSubmitHandler}>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" onChange={onChangeHandler} value={data.firstName} required />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" onChange={onChangeHandler} value={data.lastName} required />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" name="email" onChange={onChangeHandler} value={data.email} required />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="text" className="form-control" id="phoneNumber" placeholder="your mobile.." name="phoneNumber" onChange={onChangeHandler} value={data.phoneNumber} required />
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="Apartment or suite" name="address" onChange={onChangeHandler} value={data.address} />
            </div>

            <div className="row">

              <div className="col-md-4 mb-3">
                <label htmlFor="city">City</label>
                <select className="form-select" id="city" name="city" onChange={onChangeHandler} value={data.city} required>
                  <option value="">Choose...</option>
                  <option>Pune</option>
                  <option>Delhi</option>
                  <option>Gurugram</option>
                  <option>Mumbai</option>
                  <option>Hyderabad</option>
                  <option>Bangalore</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" name="zipcode" onChange={onChangeHandler} value={data.zipcode} required />
              </div>
            </div>

            <hr className="my-4" />

            <button className="btn btn-success w-100 btn-lg" type="submit" disabled={cartItems.length === 0}>
              Make Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
