import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) =>{
    const [foodList,setFoodList] = useState([]);
    const [quantities,setQuantities] = useState({});

    const increaseqty = (foodId)=>{
        setQuantities((prev)=>({...prev,[foodId]:(prev[foodId] || 0)+1}));
    }

    const decreaseqty = (foodId) =>{
        setQuantities((prev)=>({...prev,[foodId]:prev[foodId]>0?prev[foodId]-1:0}));
    }
    const removeItem = (id) => {
    setQuantities(prev => ({ ...prev, [id]: 0 }));
};
    const fetchFoodList = async ()=>{
        try {
            const response = await fetch('http://localhost:8080/api/dishes/getAll');
            const data = await response.json();
            setFoodList(data);
        } catch (error) {
            console.log(error);
        }
    }

    const contextValue = {
        foodList,
        increaseqty,
        decreaseqty,
        quantities,
        removeItem
    }; 

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
        }
        loadData();
    },[]);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}