import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
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
import Search from './pages/Search'
import AddPlant from './pages/AddPlant'
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
              <Route path='/add-plant' element={<AddPlant />} />
              <Route path='/search' element={<Search />} />
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
