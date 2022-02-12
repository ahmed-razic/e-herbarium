import { IoFlowerSharp } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({ title }) {
  const location = useLocation()
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true
    }
  }
  return (
    <nav className='navbar mb-12 shadow-lg bg-[#00cc66] text-neutral-content'>
      <div className='container mx-auto'>
        <div className='flex-none px-2 mx-2'>
          <IoFlowerSharp className='inline pr-2 text-5xl' fill='yellow' />
          <Link
            to='/'
            className='text-2xl text-[yellow] font-bold align-middle'
          >
            {title}
          </Link>
        </div>

        <div className='flex-1 px-2 mx-2 align-middle'>
          <div className='flex justify-end '>
            <Link
              to='/sign-up'
              className={`btn btn-ghost btn-sm rounded-btn text-base text-${
                pathMatchRoute('/sign-up') ? '[#ffffff]' : '[#2c2c2c]'
              }`}
            >
              Sign-up
            </Link>
            <Link
              to='/sign-in'
              className={`btn btn-ghost btn-sm rounded-btn text-base text-${
                pathMatchRoute('/sign-in') ? '[#ffffff]' : '[#2c2c2c]'
              }`}
            >
              Sign-in
            </Link>
            <Link
              to='/profile'
              className={`btn btn-ghost btn-sm rounded-btn text-base text-${
                pathMatchRoute('/profile') ? '[#ffffff]' : '[#2c2c2c]'
              }`}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'e-Herbarium',
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
