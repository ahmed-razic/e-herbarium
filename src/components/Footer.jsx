import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../assets/svg/homeIconFooter.svg';
import { ReactComponent as AboutIcon } from '../assets/svg/aboutIcon.svg';
import { ReactComponent as FlowerIcon } from '../assets/svg/flowerIcon.svg';
import { ReactComponent as SearchIcon } from '../assets/svg/searchIcon.svg';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <footer className='footerContainer'>
      <nav className='footerNav'>
        <ul className='footerListItems'>
          <li className='footerListItem' onClick={() => navigate('/')}>
            <HomeIcon
              fill={pathMatchRoute('/') ? '#4fcc4f' : '#ffffff'}
              width='24px'
              height='24px'
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
              width='24px'
              height='24px'
            />
            <p
              className={
                pathMatchRoute('/search')
                  ? 'footerListItemNameActive'
                  : 'footerListItemName'
              }
            >
              NatureServe
            </p>
          </li>
          <li className='footerListItem' onClick={() => navigate('/herbarium')}>
            <FlowerIcon
              fill={pathMatchRoute('/herbarium') ? '#4fcc4f' : '#ffffff'}
              width='24px'
              height='24px'
            />
            <p
              className={
                pathMatchRoute('/herbarium')
                  ? 'footerListItemNameActive'
                  : 'footerListItemName'
              }
            >
              e-Herbarium
            </p>
          </li>
          <li className='footerListItem' onClick={() => navigate('/about')}>
            <AboutIcon
              fill={pathMatchRoute('/about') ? '#4fcc4f' : '#ffffff'}
              width='24px'
              height='24px'
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
  );
}

export default Footer;
