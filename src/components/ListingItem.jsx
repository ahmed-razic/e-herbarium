import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'

function ListingItem({ listing, id, onDelete, onEdit }) {
  console.log(id)
  return (
    <li className='categoryListing'>
      <Link to={`/plant/${id}`} className='categoryListingLink'>
        <img
          src={listing.imgUrls[0]}
          alt='plant_image'
          className='categoryListingImg'
        />
      </Link>
      <div className='categoryListingDetails'>
        <p className='categoryListingMainName'>
          <strong> {listing.commonName}</strong>
        </p>
        <p className='categoryListingName'>
          Family: <strong>{listing.family}</strong>
        </p>
        <p className='categoryListingName'>
          Genus: <strong>{listing.genus}</strong>
        </p>
        <p className='categoryListingName'>
          Species: <strong>{listing.species}</strong>
        </p>
        <p className='categoryListingName'>
          Location: <strong>{listing.location}</strong>
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

      {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}
    </li>
  )
}

export default ListingItem
