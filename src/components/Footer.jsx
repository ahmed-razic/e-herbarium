import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as HomeIcon } from '../assets/svg/homeIconFooter.svg'
import { ReactComponent as AboutIcon } from '../assets/svg/aboutIcon.svg'
import { ReactComponent as FlowerIcon } from '../assets/svg/flowerIcon.svg'
import { ReactComponent as SearchIcon } from '../assets/svg/searchIcon.svg'

function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true
    }
  }
  return (
    <footer className='footerContainer'>
      <nav className='footerNav'>
        <ul className='footerListItems'>
          <li className='footerListItem' onClick={() => navigate('/')}>
            <HomeIcon
              fill={pathMatchRoute('/') ? '#4fcc4f' : '#ffffff'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/')
                  ? 'footerListItemNameActive'
                  : 'footerListItemName'
              }
            >
              Home
            </p>
          </li>
          <li className='footerListItem' onClick={() => navigate('/search')}>
            <SearchIcon
              fill={pathMatchRoute('/search') ? '#4fcc4f' : '#ffffff'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/search')
                  ? 'footerListItemNameActive'
                  : 'footerListItemName'
              }
            >
              Search
            </p>
          </li>
          <li className='footerListItem' onClick={() => navigate('/add-plant')}>
            <FlowerIcon
              fill={pathMatchRoute('/add-plant') ? '#4fcc4f' : '#ffffff'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/add-plant')
                  ? 'footerListItemNameActive'
                  : 'footerListItemName'
              }
            >
              Add Plant
            </p>
          </li>
          <li className='footerListItem' onClick={() => navigate('/about')}>
            <AboutIcon
              fill={pathMatchRoute('/about') ? '#4fcc4f' : '#ffffff'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute('/about')
                  ? 'footerListItemNameActive'
                  : 'footerListItemName'
              }
            >
              About
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer
