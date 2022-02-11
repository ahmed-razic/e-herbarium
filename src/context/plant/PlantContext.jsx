import { createContext, useReducer } from 'react'
import { plantReducer } from './PlantReducer'

const PlantContext = createContext()

export const PlantProvider = ({ children }) => {
  const initialState = {
    plant: {},
    loading: false,
  }
  const [state, dispatch] = useReducer(plantReducer, initialState)
  return (
    <PlantContext.Provider value={{ state, dispatch }}>
      {children}
    </PlantContext.Provider>
  )
}

export default PlantContext
