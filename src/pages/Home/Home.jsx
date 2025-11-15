import React, { useState } from 'react'
import MenuBar from '../../components/MenuBar/Menubar'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
const Home = () => {
  const[category,setCategory] = useState('All');
  return (
    <div className='container'>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category} searchText={''} />
    </div>
  )
}

export default Home 