export const initialState = {
  appointments: [],
  loading: false,
  error: null
}

export const appointmentReducer = ( state, action ) => {
  switch( action.type ){
    case 'SET_LOADING':
      return {...state, loading:true}
    case 'SET_APPOINTMENTS':
      return {...state, appointments: action.payload, loading:false}
    case 'ADD_APPOINTMENT': 
      return {...state, appointments: [action.payload, ...state.appointments]}
    case 'CANCEL_APPOINTMENT':
      return {...state, 
        appointments: state.appointments.map(a => a.id === action.payload ? {...a, status: 'cancelled'} : a
        )
      }
    case 'SET_ERROR':
      return {...state, error: action.payload, loading: false}
    default:
      return state
  }
}