import { useEffect } from 'react';
import { IoFlowerSharp } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthStatus } from '../hooks/useAuthStatus';

function Navbar({ title }) {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const location = useLocation();

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <nav className='navbar shadow-lg bg-[#2c2b2b] text-neutral-content'>
      <div className='container mx-auto'>
        <div className='flex-none px-2 mx-2'>
          <IoFlowerSharp className='inline pr-2 text-5xl' fill='#4fcc4f' />
          <Link
            to='/'
            className='text-2xl text-[#4fcc4f] font-bold align-middle'
          >
            {title}
          </Link>
        </div>

        <div className='flex-1 px-2 mx-2 align-middle'>
          <div className='flex justify-end '>
            {!loggedIn && (
              <>
                <Link
                  to='/sign-up'
                  className={`btn btn-sm rounded-btn text-sm mr-4 bg-[#2c2b2b] text-${
                    pathMatchRoute('/sign-up') ? '[#4fcc4f]' : '[#ffffff]'
                  }`}
                >
                  Sign-up
                </Link>
                <Link
                  to='/sign-in'
                  className={`btn btn-sm rounded-btn text-sm mr-4 bg-[#2c2b2b] text-${
                    pathMatchRoute('/sign-in') ? '[#4fcc4f]' : '[#ffffff]'
                  }`}
                >
                  Sign-in
                </Link>
              </>
            )}

            <Link
              to='/profile'
              className={`btn btn-sm rounded-btn text-sm mr-4 bg-[#2c2b2b] text-${
                pathMatchRoute('/profile') ? '[#4fcc4f]' : '[#ffffff]'
              }`}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.defaultProps = {
  title: 'e-Herbarium',
};

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
