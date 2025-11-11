import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) =>{
    const [foodList,setFoodList] = useState([]);

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
        foodList
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