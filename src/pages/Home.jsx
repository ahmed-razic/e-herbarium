import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div className='pageContainer'>
        <h1 className='pageHeader mb-10'>Welcome to e-Herbarium</h1>
        <div className='flex flex-col'></div>
        <Link
          to='/what-is-herbarium'
          className='btn glass normal-case w-48 bg-[#3d803d] mr-5'
        >
          What is Herbarium
        </Link>
        <Link
          to='/herbarium'
          className='btn glass normal-case w-48 bg-[#3d803d] mr-5'
        >
          e-Herbarium
        </Link>
        <Link
          to='/search'
          className='btn glass normal-case w-48 bg-[#3d803d] mr-5'
        >
          Search NatureServe
        </Link>
        <Link
          to='/profile'
          className='btn glass normal-case w-48 bg-[#3d803d] mr-5'
        >
          Profile
        </Link>
      </div>
    </>
  );
}
export default Home;
