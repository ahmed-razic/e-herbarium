import { IoFlowerSharp } from 'react-icons/io5'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import ListingItem from '../components/HerbariumItem'

function Profile() {
  const [loading, setLoading] = useState(true)
  const [plants, setPlants] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserPlants = async () => {
      const plantsRef = collection(db, 'plants')
      const q = query(
        plantsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )
      const querySnap = await getDocs(q)
      let plants = []

      querySnap.forEach((doc) => {
        return plants.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setPlants(plants)
      setLoading(false)
    }
    fetchUserPlants()
  }, [auth.currentUser.uid])

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name })
      }

      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, { name: name })
    } catch (error) {
      toast.error('Profile details could not be updated')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onDelete = async (plantId) => {
    if (window.confirm('Are you sure you wont to delete?')) {
      await deleteDoc(doc(db, 'plants', plantId))
      const updatedPlants = plants.filter((plant) => plant.id !== plantId)
      setPlants(updatedPlants)
      toast.success('You deleted plant')
    }
  }

  const onEdit = (plantId) => {
    navigate(`/edit-plant/${plantId}`)
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'Done' : 'Change'}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input
              type='text'
              name='name'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              name='email'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        <Link
          to='/add-plant'
          className='btn mt-5 bg-[#4fcc4f] rounded-full border-none'
        >
          <IoFlowerSharp className='mr-2' size={24} />
          <p>Add plant</p>
        </Link>

        {!loading && plants.length > 0 && (
          <>
            <p className='listingText mb-5 text-2xl'>Your Plants</p>
            <ul className='listingsList'>
              {plants.map((plant) => (
                <ListingItem
                  key={plant.id}
                  plant={plant.data}
                  id={plant.id}
                  onDelete={() => onDelete(plant.id)}
                  onEdit={() => onEdit(plant.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile
