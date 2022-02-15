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
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const auth = getAuth()
  const params = useParams()

  console.log(params.id)
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'plants', params.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <main className='pageContainer'>
      <div className='categoryListing'>
        <div className='categoryListingLink'>
          <img
            src={listing.imgUrls[0]}
            alt='plant_image'
            className='categoryListingImg'
          />
        </div>
        <div className='categoryListingDetails'>
          <p className='categoryListingMainName'>
            <strong> {listing.commonName}</strong>
          </p>
          <p className='categoryListingName'>
            Scientific name: <strong> {listing.scientificName}</strong>
          </p>
          <p className='categoryListingName'>
            Family: <strong>{listing.family}</strong>
          </p>
          <p className='categoryListingName'>
            Genus: <strong>{listing.genus}</strong>
          </p>
          <p className='categoryListingName'>
            Location: <strong>{listing.location}</strong>
          </p>
          <p className='categoryListingName'>
            Location Description: <strong>{listing.locationDescription}</strong>
          </p>
          <p className='categoryListingName'>
            Longitude: <strong>{listing.geolocation.longitude}</strong> <br />
            Latitude: <strong>{listing.geolocation.latitude}</strong>
          </p>
          <p className='categoryListingName'>
            Altitude: <strong>{listing.altitude} m</strong>
          </p>
          <p className='categoryListingName'>
            Collector: <strong>{listing.collectorName}</strong>
          </p>
        </div>
        {onDelete && (
          <DeleteIcon
            className='removeIcon'
            fill='rgb(231, 76, 60)'
            onClick={() => onDelete(listing.id, listing.name)}
          />
        )}

        {onEdit && (
          <EditIcon className='editIcon' onClick={() => onEdit(params.id)} />
        )}
      </div>

      {listing && (
        <>
          <p className='exploreHeading'>Herbarium photos</p>

          <Swiper slidesPerView={1}>
            {listing.imgUrls.map((url, index) => (
              <SwiperSlide key={index} className='swiper-container'>
                <div
                  style={{
                    background: `url(${listing.imgUrls[index]})`,
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

      <p className='listingLocationTitle mb-4'>Place of collection</p>
      <div className='leafletContainer'>
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[listing.geolocation.latitude, listing.geolocation.longitude]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
          />
          <Marker
            position={[
              listing.geolocation.latitude,
              listing.geolocation.longitude,
            ]}
          >
            <Popup>{listing.address}</Popup>
          </Marker>
        </MapContainer>
      </div>

      {auth.currentUser?.uid !== listing.userRef && (
        <Link
          to={`/contact/${listing.userRef}?listingName=${listing.name}`}
          className='primaryButton'
        >
          Contact Owner
        </Link>
      )}
    </main>
  )
}

export default Plant
