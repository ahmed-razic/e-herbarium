const plantReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PLANT':
      return {
        ...state,
        plant: action.payload,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_PLANT':
      return {
        ...state,
        plant: {},
        loading: false,
      }
    default:
      return state
  }
}

export default plantReducer
