import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'

function HerbariumItem({ plant, id, onDelete, onEdit }) {
  return (
    <li className='categoryListing'>
      <Link to={`/plant/${id}`} className='categoryListingLink'>
        <img
          src={plant.imgUrls[0]}
          alt='plant_image'
          className='categoryListingImg'
        />
      </Link>
      <div className='categoryListingDetails'>
        <p className='categoryListingMainName'>
          <strong> {plant.commonName}</strong>
        </p>
        <p className='categoryListingName'>
          Scientific name: <strong>{plant.scientificName}</strong>
        </p>
        <p className='categoryListingName'>
          Location: <strong>{plant.location}</strong>
        </p>
        <p className='categoryListingName'>
          Collector: <strong>{plant.collectorName}</strong>
        </p>
      </div>
      {onDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231, 76, 60)'
          onClick={() => onDelete(plant.id, plant.name)}
        />
      )}

      {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}
    </li>
  )
}

export default HerbariumItem
