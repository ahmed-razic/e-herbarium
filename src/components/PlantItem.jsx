import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

function PlantItem({
  plant: { primaryCommonName, scientificName, gRank, nsxUrl },
}) {
  const speciesUrl = 'https://explorer.natureserve.org' + nsxUrl

  return (
    <div className='w-full mx-auto lg:w-10/12 h-full'>
      <div>
        <div>
          <div className='flex gap-2'>
            <h2>Name:</h2>
            <p className='text-[green] font-bold'>{primaryCommonName}</p>
          </div>
          <div className='flex gap-2'>
            <h2>ScientificName:</h2>
            <p>{scientificName}</p>
          </div>
          <div className='flex gap-2'>
            <h2>Global Ranking:</h2>
            <p>{gRank}</p>
          </div>
          <div className='flex gap-2'>
            <h2>
              <a
                href={speciesUrl}
                target='_blank'
                rel='noreferrer'
                className='text-[green] font-bold'
              >
                Find out More
              </a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlantItem
