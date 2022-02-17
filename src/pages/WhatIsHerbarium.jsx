function WhatIsHerbarium() {
  return (
    <div className='pageContainer mx-auto px-6'>
      <h1 className='text-6xl mb-10 '>What is herbarium</h1>
      <p className='text-2xl font-light text-justify mb-10'>
        Herbarium is a collection of dried plant specimens mounted on sheets of
        paper. The plants are usually collected in situ (e.g., where they were
        growing in nature), identified by experts, pressed, and then carefully
        mounted to archival paper in such a way that all major morphological
        characteristics are visible. Herbarium collections are often housed in
        botanical gardens, arboretums, natural history museums, and
        universities. The largest herbaria contain several million specimens,
        some of which date back hundreds of years. Herbaria are the
        “dictionaries” of the plant kingdom and provide comparative material
        that is indispensable for studies in plant taxonomy and systematics.
      </p>
      <p className='text-lg text-gray-700 mt-4'>Useful Links:</p>
      <ul>
        <li className='ml-10 mb-3 mt-3'>
          <a
            href='https://about.worldfloraonline.org//'
            target='_blank'
            rel='noreferrer'
          >
            <strong>World Flora Online</strong>
          </a>
        </li>
        <li className='ml-10 mb-3'>
          <a href='https://www.rbge.org.uk//' target='_blank' rel='noreferrer'>
            <strong>Royal Botanical Garden</strong>
          </a>
        </li>
        <li className='ml-10 mb-3'>
          <a
            href='https://explorer.natureserve.org/'
            target='_blank'
            rel='noreferrer'
          >
            <strong>NatureServe Explorer</strong>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default WhatIsHerbarium;
