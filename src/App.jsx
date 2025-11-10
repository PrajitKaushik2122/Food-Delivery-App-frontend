import MenuBar from './components/MenuBar/Menubar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/home'
import ExploreFood from './pages/ExploreFood/exploreFood'
import ContactUs from './pages/ContactUs/contactUs'
import Header from './components/Header/Header'
const App = () => {
  return (
    <div>
      <MenuBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<ExploreFood />} />
        <Route path='/contactUs' element={<ContactUs />} />
      </Routes>
    </div>
  )
}

export default App