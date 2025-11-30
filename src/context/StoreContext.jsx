import { createContext, use, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [token, setToken] = useState("");

    const increaseqty = async (foodId) => {
        setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
        try {
            const response = await fetch("http://localhost:8080/api/cart/add", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({
                    foodId: foodId
                })
            })
            if (response.status == 403) {
                toast.error("Please login to continue");
            }
            else if(response.status !=200){
                toast.error("error while updating cart");
            }
        } catch (error) {
            toast.error("error while updating cart");
        }
    }

    const decreaseqty = async (foodId) => {
        setQuantities((prev) => ({ ...prev, [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0 }));
        try {
            const response = await fetch("http://localhost:8080/api/cart/remove", {
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({
                    foodId: foodId
                })
            })
            if (response.status != 200) {
                toast.error("error while updating cart");
            }
        } catch (error) {
            toast.error("error while updating cart");
        }
    }
    const removeItem = async (id) => {
        setQuantities(prev => ({ ...prev, [id]: 0 }));
    };
    const fetchFoodList = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/dishes/getAll');
            const data = await response.json();
            setFoodList(data);
        } catch (error) {
            console.log(error);
        }
    }

    const loadCartData = async (token)=>{
        const response = await fetch("http://localhost:8080/api/cart/get", {
                method: "Get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
            })
            const data = await response.json();
            setQuantities(data.items);
    }

    const contextValue = {
        foodList,
        increaseqty,
        decreaseqty,
        quantities,
        removeItem,
        token,
        setToken,
        setQuantities
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'));
            }
        }
        loadData();
    }, []);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}