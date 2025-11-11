import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {
  const { foodList } = useContext(StoreContext);

  return (
    <div className="container py-4">
      <div className="row g-4">
        {foodList && foodList.length > 0 ? (
          foodList.map((food, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch justify-content-center"
            >
              <FoodItem
                name={food.name}
                description={food.description}
                id={food.id}
                imageUrl={food.imageUrl}
                price={food.price}
              />
            </div>
          ))
        ) : (
          <div className="text-center mt-4">
            <h4>No dishes found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
