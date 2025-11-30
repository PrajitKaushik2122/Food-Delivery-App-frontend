import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import logo from "../../assets/logo.jpg";
import "./MyOrders.css"
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

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();

    if (s.includes("food") || s.includes("preparing"))
      return "badge bg-warning text-dark";

    if (s.includes("out") || s.includes("delivery"))
      return "badge bg-primary";

    if (s.includes("delivered"))
      return "badge bg-success";

    return "badge bg-secondary";
  };

  return (
    <>
      <div className="container">
        <div className="py-5 row justify-content-center">
          <div className="col-11 card">
            <table className="table table-responsive">
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <img src={logo} alt="" height={48} width={48} />
                    </td>

                    <td>
                      {order.orderItems.map((item, idx) =>
                        idx === order.orderItems.length - 1
                          ? `${item.name} x ${item.qty}`
                          : `${item.name} x ${item.qty}, `
                      )}
                    </td>

                    <td>₹ {order.amount}</td>
                    <td>Items: {order.orderItems.length}</td>

                    {/* 🔥 Styled status badge */}
                    <td>
                      <span className={getStatusBadge(order.orderStatus)}>
                        ● {order.orderStatus}
                      </span>
                    </td>

                    {/* Reload button */}
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={fetchOrders}
                      >
                        <i className="bi bi-arrow-clockwise"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
