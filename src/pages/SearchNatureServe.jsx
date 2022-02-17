import PlantResults from '../components/PlantResults'
import PlantSearch from '../components/PlantSearch'

function SearchNatureServe() {
  return (
    <div className='pageContainer'>
      <p className='pageHeader mb-4'>NatureServe Explorer</p>
      <p className='mb-10 text-justify'>
        <strong className='text-[#4fcc4f]'>
          <a
            href='https://explorer.natureserve.org/'
            target='_blank'
            rel='noreferrer'
          >
            NatureServe Explorer
          </a>
        </strong>{' '}
        is the definitive source for information on rare and endangered species
        and ecosystems in the Americas. Its database contains information about
        100,000 differente species and ecosystems.
      </p>

      <PlantSearch />
      <PlantResults />
    </div>
  )
}
export default SearchNatureServe
