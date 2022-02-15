import { useState, useContext } from 'react'
import PlantContext from '../context/plant/PlantContext'
import AlertContext from '../context/alert/AlertContext'
import { searchPlants } from '../context/plant/PlantActions'
import Alert from './Alert'

function PlantSearch() {
  const [text, setText] = useState('')

  const { plants, dispatch } = useContext(PlantContext)
  const { setAlert } = useContext(AlertContext)

  const handleChange = (e) => setText(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (text === '') {
      setAlert('Please enter something', 'error')
    } else {
      dispatch({ type: 'SET_LOADING' })
      const plants = await searchPlants(text)
      dispatch({ type: 'GET_PLANTS', payload: plants })
      setText('')
    }
  }

  return (
    <div>
      <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 mb-8 gap-8'>
        <div>
          <Alert />
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <div className='relative'>
                <input
                  type='text'
                  className='w-full pr-40 bg-gray-200 input input-lg h text-black'
                  placeholder='Enter name of plant'
                  value={text}
                  onChange={handleChange}
                />
                <button
                  type='submit'
                  className='absolute top-0 right-0 rounded-l-none w-36 btn btn-1xl bg-[#4fcc4f] rounded-full'
                >
                  Find
                </button>
              </div>
            </div>
          </form>
        </div>
        {plants.length > 0 && (
          <div>
            <button
              onClick={() => dispatch({ type: 'CLEAR_PLANTS' })}
              className='btn btn-1xl btn bg-[#4fcc4f]'
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlantSearch
