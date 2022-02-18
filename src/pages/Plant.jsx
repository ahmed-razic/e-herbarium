import { Link, useParams } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import { useState, useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { getAuth } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Plant({ onDelete, onEdit }) {
  const [plant, setPlant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const auth = getAuth()
  const params = useParams()

  useEffect(() => {
    const fetchPlant = async () => {
      const docRef = doc(db, 'plants', params.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setPlant(docSnap.data())
        setLoading(false)
      }
    }
    fetchPlant()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <main className='container p-10 mx-auto'>
      <div className='plantTitle mb-4'>Plant</div>
      <div className='categoryListing'>
        <div className='categoryListingLink'>
          <img
            src={plant.imgUrls[0]}
            alt='plant_image'
            className='categoryListingImg mr-5'
          />
        </div>
        <div className='categoryListingDetails'>
          <p className='categoryListingMainName'>
            <strong> {plant.commonName}</strong>
          </p>
          <p className='categoryListingName'>
            Scientific name: <strong> {plant.scientificName}</strong>
          </p>
          <p className='categoryListingName'>
            Family: <strong>{plant.family}</strong>
          </p>
          <p className='categoryListingName'>
            Genus: <strong>{plant.genus}</strong>
          </p>
          <p className='categoryListingName'>
            Date: <strong>{plant.timestamp.toDate().toDateString()}</strong>
          </p>
          <p className='categoryListingName'>
            Location: <strong>{plant.location}</strong>
          </p>
          <p className='categoryListingName'>
            Longitude: <strong>{plant.geolocation.longitude}</strong> <br />
            Latitude: <strong>{plant.geolocation.latitude}</strong>
          </p>
          <p className='categoryListingName'>
            Altitude: <strong>{plant.altitude} m</strong>
          </p>
          <p className='categoryListingName'>
            Collector: <strong>{plant.collectorName}</strong>
          </p>
          {auth.currentUser?.uid !== plant.userRef && (
            <Link
              to={`/contact/${plant.userRef}?plantName=${plant.name}`}
              className='btn bg-[#00cc66] border-none '
            >
              Contact Collector
            </Link>
          )}
        </div>
        {onDelete && (
          <DeleteIcon
            className='removeIcon'
            fill='rgb(231, 76, 60)'
            onClick={() => onDelete(plant.id, plant.name)}
          />
        )}

        {onEdit && (
          <EditIcon className='editIcon' onClick={() => onEdit(params.id)} />
        )}
      </div>

      {plant && (
        <>
          <p className='herbariumPhotosTitle mb-4'>Herbarium photos</p>

          <Swiper slidesPerView={2} pagination={{ clickable: true }}>
            {plant.imgUrls.map((url, index) => (
              <SwiperSlide key={index} className='swiper-container'>
                <div
                  style={{
                    background: `url(${plant.imgUrls[index]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                  className='swiperSlideDiv'
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}

      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

      <p className='plantLocationTitle mb-4'>Location of collection</p>
      <div className='leafletContainer mb-5'>
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[plant.geolocation.latitude, plant.geolocation.longitude]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
          />
          <Marker
            position={[plant.geolocation.latitude, plant.geolocation.longitude]}
          >
            <Popup>{plant.address}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </main>
  )
}

export default Plant
