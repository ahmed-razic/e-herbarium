import { IoFlowerSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({ title }) {
  return (
    <nav className='navbar mb-12 shadow-lg bg-[#00cc66] text-neutral-content'>
      <div className='container mx-auto'>
        <div className='flex-none px-2 mx-2'>
          <IoFlowerSharp className='inline pr-2 text-5xl' fill='yellow' />
          <Link to='/' className='text-3xl  font-bold align-middle'>
            {title}
          </Link>
        </div>

        <div className='flex-1 px-2 mx-2'>
          <div className='flex justify-end'>
            <Link to='/sign-up' className='btn btn-ghost btn-sm rounded-btn'>
              Sign-up
            </Link>
            <Link to='/sign-in' className='btn btn-ghost btn-sm rounded-btn'>
              Sign-in
            </Link>
            <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
              Home
            </Link>
            <Link to='/about' className='btn btn-ghost btn-sm rounded-btn'>
              About
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
