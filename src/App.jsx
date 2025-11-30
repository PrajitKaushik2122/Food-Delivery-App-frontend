import MenuBar from './components/MenuBar/MenuBar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/home'
import ExploreFood from './pages/ExploreFood/exploreFood'
import ContactUs from './pages/ContactUs/contactUs'
import FoodDetails from './pages/FoodDetails/FoodDetails'
import { ToastContainer } from 'react-toastify'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import MyOrders from './pages/MyOrders/MyOrders'
import { useContext } from 'react'
import { StoreContext } from './context/StoreContext'
const App = () => {
  const {token} = useContext(StoreContext);
  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <MenuBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/explore' element={<ExploreFood />} />
        <Route path='/contactUs' element={<ContactUs />} />
        <Route path='/Details/:id' element={<FoodDetails />} />
        <Route path='/Cart' element={token?<Cart/>:<Login />} />
        <Route path='/placeOrder' element={<PlaceOrder />} />
        <Route path='/login' element={token?<Home/>:<Login />} />
        <Route path='/register' element={token?<Home/>:<Register />} />
        <Route path='/myorders' element={token?<MyOrders/>:<Login/>} />

      </Routes>
    </div>
  )
}

export default App