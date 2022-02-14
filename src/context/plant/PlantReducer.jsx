const plantReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PLANTS':
      return {
        ...state,
        plants: action.payload,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_PLANTS':
      return {
        ...state,
        plants: [],
        loading: false,
      }
    default:
      return state
  }
}

export default plantReducer
