import { createContext, useContext, useReducer } from "react";
import { appointmentReducer, initialState } from "./appointmentReducer";

const AppointmentContext = createContext(null);

export const AppointmentProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(appointmentReducer, initialState)
  return(
    <AppointmentContext.Provider value={{ state, dispatch }}>
      { children }
    </AppointmentContext.Provider>
  )
}

export const useAppointments = () => useContext(AppointmentContext);