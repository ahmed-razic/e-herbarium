import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AlertProvider } from './context/alert/AlertContext'
import { PlantProvider } from './context/plant/PlantContext'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import ForgotPassword from './pages/ForgotPassword'
import About from './pages/About'
import WhatIsHerbarium from './pages/WhatIsHerbarium'
import Herbarium from './pages/Herbarium'
import Plant from './pages/Plant'
import SearchNatureServe from './pages/SearchNatureServe'
import AddPlant from './pages/AddPlant'
import EditPlant from './pages/EditPlant'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <PlantProvider>
        <AlertProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<PrivateRoute />}>
                <Route path='/profile' element={<Profile />} />
              </Route>
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/what-is-herbarium' element={<WhatIsHerbarium />} />
              <Route path='/herbarium' element={<Herbarium />} />
              <Route path='/plant/:id' element={<Plant />} />
              <Route path='/add-plant' element={<AddPlant />} />
              <Route path='/edit-plant/:plantId' element={<EditPlant />} />
              <Route path='/search' element={<SearchNatureServe />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/about' element={<About />} />
              <Route path='/notFound' element={<NotFound />} />
              <Route path='/*' element={<NotFound />} />
              <Route path='/contact/:collectorId' element={<Contact />} />
            </Routes>
            <Footer />
          </Router>
        </AlertProvider>
      </PlantProvider>
      <ToastContainer />
    </>
  )
}

export default App
