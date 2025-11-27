import React, { useState } from "react";
import './placeOrder.css'
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
const PlaceOrder = () => {
  const { foodList, increaseqty, decreaseqty, quantities, removeItem, token } = useContext(StoreContext);
  const cartItems = foodList.filter(food => quantities[food.id] > 0);
  const [data,setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    zipcode: ''
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]: value}));
  }

  const onSubmitHandler = async (event)=>{
    event.preventDefault();
    const orderData={
      userAddress: `${data.firstName} ${data.lastName} ${data.address} ${data.city} ${data.zipcode}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map(item=>({
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
    }

    try {
      const response = await fetch('http://localhost:8080/api/dishes/get', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: orderData
      })
      if(response.status == 201){
        const data = await response.json();
        if(data.razorpayOrderId){
          initiatePayment(data);
        }
      }
      else{
        toast.error("unable to process please try again");
      }
    } catch (error) {
      toast.error("unable to process please try again");
    }


  }

  const subtotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);
  const shipping = subtotal == 0 ? 0.0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
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
                <li className="list-group-item d-flex justify-content-between">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-muted">Qty: {quantities[item.id]}</small>
                  </div>
                  <span className="text-muted">&#8377;{item.price * quantities[item.id]}</span>
                </li>
              ))
            }
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <h6 className="my-0">Shipping cost</h6>
                <small className="text-muted"></small>
              </div>
              <span className="text-muted">&#8377;{shipping}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <h6 className="my-0">Tax</h6>
                <small className="text-muted">10% of your total subtotal</small>
              </div>
              <span className="text-muted">&#8377;{tax}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>&#8377;{total}</strong>
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
              <label htmlFor="email">
                Email
              </label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" name="email" onChange={onChangeHandler} value={data.email} required />
            </div>

            <div className="mb-3">
              <label htmlFor="address">Phone Number</label>
              <input type="text" className="form-control" id="phoneNumber" placeholder="your mobile.." name="phoneNumber" onChange={onChangeHandler} value={data.phoneNumber} required />
            </div>

            <div className="mb-3">
              <label htmlFor="address2">
                Address
              </label>
              <input type="text" className="form-control" id="address" placeholder="Apartment or suite" name="address" onChange={onChangeHandler} value={data.address}  />
            </div>

            <div className="row">

              <div className="col-md-4 mb-3">
                <label htmlFor="state">City</label>
                <select className="form-select" id="state" name="state" onChange={onChangeHandler} value={data.state} required>
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
                <input type="text" className="form-control" id="zip"  name="zipcode" onChange={onChangeHandler} value={data.zipcode} required />
              </div>
            </div>

            <hr className="my-4" />

            <button className="btn btn-success w-100 btn-lg" type="submit" disabled={cartItems.length==0}>
              Make Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
