import { useContext } from 'react'
import Spinner from './Spinner'
import PlantItem from './PlantItem'
import PlantContext from '../context/plant/PlantContext'

function PlantResults() {
  const { plants, loading } = useContext(PlantContext)

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1'>
        {plants.map((plant) => (
          <PlantItem key={plant.uniqueId} plant={plant} />
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default PlantResults
