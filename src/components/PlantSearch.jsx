import { useState, useContext } from 'react';
import PlantContext from '../context/plant/PlantContext';
import AlertContext from '../context/alert/AlertContext';
import { searchPlants } from '../context/plant/PlantActions';
import Alert from './Alert';

function PlantSearch() {
  const [text, setText] = useState('');

  const { plants, dispatch } = useContext(PlantContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please enter something', 'error');
    } else {
      dispatch({ type: 'SET_LOADING' });
      const plants = await searchPlants(text);
      dispatch({ type: 'GET_PLANTS', payload: plants });
      setText('');
    }
  };

  return (
    <div>
      <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 mb-8 gap-8'>
        <div>
          <Alert />
          <form onSubmit={handleSubmit}>
            <div className='form-control'>
              <div className='input-group'>
                <input
                  type='text'
                  placeholder='Search… (e.g. Apple)'
                  className='input input-bordered'
                  value={text}
                  onChange={handleChange}
                />
                <button
                  className='btn btn-square bg-[#4fcc4f] w-20'
                  type='submit'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
        {plants.length > 0 && (
          <div>
            <button
              onClick={() => dispatch({ type: 'CLEAR_PLANTS' })}
              className='btn btn-square bg-[#4fcc4f] w-20'
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlantSearch;
