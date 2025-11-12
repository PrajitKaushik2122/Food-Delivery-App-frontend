import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const FoodDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const fetchDetails = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/api/dishes/get', {
        method: 'GET',
        headers: {
          'id': id
        }
      });

      if (response.status === 200) {
        const result = await response.json();
        setData(result);
      } else {
        toast.error("Error fetching details");
      }
    } catch (error) {
      toast.error("Error fetching details");
    }
  };

  useEffect(() => {
    if (id) fetchDetails(id);
  }, [id]);

  return (
    <section className="py-5 bg-light">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-5 gy-5 justify-content-center shadow-lg p-4 rounded-4 bg-white">
          
          {/* Image Section */}
          <div className="col-md-5 text-center d-flex align-items-center justify-content-center">
            <img
              className="img-fluid rounded-4 shadow-sm"
              src={data.imageUrl || "https://dummyimage.com/500x500/ddd/555.jpg&text=No+Image"}
              alt={data.name || "Food item"}
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "20px"
              }}
            />
          </div>

          {/* Details Section */}
          <div className="col-md-6 d-flex flex-column justify-content-center h-100">
            <h6 className="text-uppercase text-muted mb-2">
              Category: <span className="badge text-bg-warning">{data.category || "N/A"}</span>
            </h6>

            <h1 className="display-6 fw-bold text-dark mb-3">
              {data.name || "Loading..."}
            </h1>

            <div className="fs-4 fw-semibold mb-3">
              ₹ {data.price || 40.0}
            </div>

            <p className="lead text-secondary mb-4" style={{ lineHeight: "1.6" }}>
              {data.description || "No description available for this dish."}
            </p>

            <div className="d-flex align-items-center gap-3">
              <input
                className="form-control text-center"
                id="inputQuantity"
                type="number"
                defaultValue="1"
                min="1"
                style={{
                  width: "70px",
                  borderRadius: "12px",
                  border: "1px solid #ccc"
                }}
              />
              <button
                className="btn btn-outline-dark px-4 py-2 rounded-3 shadow-sm"
                type="button"
              >
                <i className="bi-cart-fill me-2"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;
