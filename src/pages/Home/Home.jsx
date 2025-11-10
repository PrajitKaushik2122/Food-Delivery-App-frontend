import React from 'react'
import MenuBar from '../../components/MenuBar/Menubar'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'

const Home = () => {
  return (
    <div className='container'>
        <Header/>
        <ExploreMenu/>
    </div>
  )
}

export default Home 