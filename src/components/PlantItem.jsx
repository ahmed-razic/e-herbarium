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
            <p className='text-[#4fcc4f] font-bold'>
              <a
                href={speciesUrl}
                target='_blank'
                rel='noreferrer'
                className='text-[#4fcc4f] font-bold'
              >
                {primaryCommonName}
              </a>
            </p>
          </div>
          <div className='flex gap-2'>
            <h2>ScientificName:</h2>
            <p>{scientificName}</p>
          </div>
          <div className='flex gap-2'>
            <h2>Global Ranking:</h2>
            <p>{gRank}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlantItem
