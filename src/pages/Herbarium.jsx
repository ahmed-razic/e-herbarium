import shareIcon from '../assets/svg/shareIcon.svg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import HerbariumItem from '../components/HerbariumItem'
import 'swiper/swiper-bundle.css'

function Herbarium() {
  const [plants, setPlants] = useState(null)
  const [loading, setLoading] = useState(null)
  const [lastFetchedPlant, setLastFetchedPlant] = useState(null)

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantsRef = collection(db, 'plants')
        const docsSnap = await getDocs(plantsRef)

        const lastVisible = docsSnap.docs[docsSnap.docs.length - 1]
        setLastFetchedPlant(lastVisible)

        const plants = []

        docsSnap.forEach((doc) => {
          return plants.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setPlants(plants)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch plants')
      }
    }

    fetchPlants()
  }, [])

  //Pagination - Load more plants

  const onFetchMorePlants = async () => {
    try {
      const plantsRef = collection(db, 'plants')

      const q = query(plantsRef, startAfter(lastFetchedPlant), limit(10))
      const docsSnap = await getDocs(q)

      const lastVisible = docsSnap.docs[docsSnap.docs.length - 1]
      setLastFetchedPlant(lastVisible)
      const listings = []

      docsSnap.forEach((doc) => {
        return plants.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setPlants((prevState) => [...prevState, ...plants])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch plants')
    }
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader mb-4'>All Plants in Herbarium</p>
      </header>

      {loading ? (
        <Spinner />
      ) : plants && plants.length > 0 ? (
        <>
          <main>
            <ul className='categoryPlants'>
              {plants.map((plant) => (
                <HerbariumItem
                  plant={plant.data}
                  id={plant.id}
                  key={plant.id}
                />
              ))}
            </ul>
          </main>
          <br />
          <br />
          {lastFetchedPlant && (
            <p className='loadMore' onClick={onFetchMorePlants}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No plants</p>
      )}
    </div>
  )
}

export default Herbarium
