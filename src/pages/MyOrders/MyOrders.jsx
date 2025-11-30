import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import logo from "../../assets/logo.jpg";


const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive">
            <tbody>
              {
                orders.map((order,index)=>{
                  return (
                    <tr key={index}>
                      <td>
                        <img src={logo} alt="" height={48} width={48}/>
                      </td>
                      <td>{order.orderItems.map((item,index)=>{
                        if(index===order.orderItems.length-1){
                          return item.name + " x " + item.qty;
                        }
                        else{
                          return item.name + " x " + item.qty + ", ";
                        }
                      })}</td>
                      <td>&#x20B9; {order.amount}</td>
                      <td>Items: {order.orderItems.length}</td>
                      <td className="fw-bold text-capitalize">&#x25cf;{order.orderStatus}</td>
                      <td>
                        <button className="btn btn-sm btn-warning" onClick={fetchOrders}>
                          <i className="bi bi-arrow-clockwise">

                          </i>
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
