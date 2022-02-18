import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div className='pageContainer'>
        <h1 className='pageHeader mb-10'>Welcome to e-Herbarium</h1>
        <div className='flex-col col-span-1'></div>
        <Link
          to='/what-is-herbarium'
          className='btn btn-wide h-16 text-lg normal-case bg-[#3d803d] mb-5 mr-5'
        >
          What is Herbarium
        </Link>
        <Link
          to='/herbarium'
          className='btn btn-wide h-16 text-lg normal-case bg-[#3d803d] mb-5 mr-5'
        >
          e-Herbarium
        </Link>
        <Link
          to='/search'
          className='btn btn-wide h-16 text-lg normal-case bg-[#3d803d] mb-5 mr-5'
        >
          Search NatureServe
        </Link>
        <Link
          to='/profile'
          className='btn btn-wide h-16 text-lg normal-case bg-[#3d803d] mb-5 mr-5'
        >
          Profile
        </Link>
      </div>
    </>
  )
}
export default Home
