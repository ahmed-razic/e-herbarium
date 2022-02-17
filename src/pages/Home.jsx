import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div className='big-image'>
        <div className='overlay'>
          <h1>Welcome to e-Herbarium</h1>
          <Link
            to='/what-is-herbarium'
            className='btn btn-wide glass btn-lg rounded-btn text-lg normal-case bg-[#3d803d] mb-10 ml-16'
          >
            What is Herbarium
          </Link>
          <Link
            to='/herbarium'
            className='btn btn-wide glass btn-lg rounded-btn text-lg normal-case bg-[#3d803d] mb-10 ml-16'
          >
            e-Herbarium
          </Link>
          <Link
            to='/search'
            className='btn btn-wide glass btn-lg rounded-btn text-lg normal-case text bg-[#3d803d] mb-10 ml-16'
          >
            Search NatureServe
          </Link>
          <Link
            to='/profile'
            className='btn btn-wide glass btn-lg rounded-btn text-lg normal-case bg-[#3d803d] mb-10 ml-16'
          >
            Profile
          </Link>
        </div>
      </div>
    </>
  )
}
export default Home
