function About() {
  return (
    <div className='pageContainer mx-auto px-6'>
      <h1 className='text-6xl mb-10 '>e-Herbarium</h1>
      <p className='text-2xl font-light text-justify mb-10'>
        e-Herbarium is a small web page for students and hobby botanists.
        Provides capabilities to store images of collected flora and all other
        important data (collector's name, time, date and geolocation,
        description...). Secure User Authorization and Data Storage is done
        using Google Firebase cloud service. Connection to NatureServe database
        is provided for purpose of finding more information about plants.
      </p>
      <p className='text-lg text-gray-700 mt-4'>
        API provided by:{' '}
        <strong>
          <a
            href='https://explorer.natureserve.org/api-docs/'
            target='_blank'
            rel='noreferrer'
          >
            NatureServe Explorer.
          </a>
        </strong>
      </p>
      <p className='text-lg text-gray-700'>
        Version: <strong>1.0.0</strong>
      </p>
      <p className='text-lg text-gray-700'>
        Author:
        <strong>
          <a
            href='https://github.com/ahmed-razic'
            target='_blank'
            rel='noreferrer'
          >
            {' '}
            Ahmed Razic
          </a>
        </strong>
      </p>
    </div>
  )
}

export default About
