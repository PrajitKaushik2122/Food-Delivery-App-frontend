import MenuBar from './components/MenuBar/Menubar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/home'
import ExploreFood from './pages/ExploreFood/exploreFood'
import ContactUs from './pages/ContactUs/contactUs'
import Header from './components/Header/Header'
import FoodDetails from './pages/FoodDetails/FoodDetails'
import { ToastContainer } from 'react-toastify'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
const App = () => {
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
        <Route path='/Cart' element={<Cart />} />
        <Route path='/placeOrder' element={<PlaceOrder />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>
    </div>
  )
}

export default App