import { useEffect, useRef, useState } from "react";
import { useAppointments } from "../store/AppointmentContext"
import { createAppointment } from "../services/appointmentService";
import { getBarbers, getServices } from "../services/barberService";
import BarberCard from "../components/BarberCard";
import Navbar from "../components/navbar";
import HeroImage from "../assets/HeroImage.jpg";
import { FaUser } from "react-icons/fa";
import { AiOutlineScissor } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";




const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM'
]

const BookingPage = () => {
  const { dispatch } = useAppointments();
  const [ customerName, setCustomerName ] = useState("");
  const [ date, setDate ] = useState('');
  const [ timeSlot, setTimeSlot ] = useState('');
  const [ barberId, setBarberId ] = useState('');
  const [ serviceId, setServiceId ] = useState('');
  const [ barbers, setBarbers ] = useState([]);
  const [ services, setServices ] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const dateRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const [barbersData, servicesData] = await Promise.all([
        getBarbers(),
        getServices()
      ])

      setBarbers(barbersData);
      setServices(servicesData);
    }
    fetchData();
  }, [])

  const handleBooking = async () => {
    if(!customerName || !date || !timeSlot || !barberId || !serviceId ){
      alert("Fill all the fields")
      return;
    }
    try{
      dispatch({ type: 'SET_LOADING' })
      const newAppointment = await createAppointment({
        customer_name: customerName,
        date,
        time_slot: timeSlot,
        barber_id: barberId,
        service_id: serviceId,
        status: 'pending'
      })
      dispatch({ type: 'ADD_APPOINTMENT', payload: newAppointment })

    }catch(error){
      dispatch({ type: 'SET_ERROR', payload:  error.message })
    }
  }


  console.log("Date:", date)
  return(
    <div className="w-full max-w-7xl mx-auto ">
      <Navbar/>
      <div className="max-w-2xl w-full  mx-auto flex flex-col p-4">
        <div className="rounded-lg h-60 w-full relative overflow-hidden">
          <img src={HeroImage} alt="" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/60 to-transparent"></div>
          <div className="absolute bottom-8 left-4 text0white z-10 text-4xl max-w-44 font-display">
            <p>Book Your Experience</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="booking-input">
          <label htmlFor="name">CUSTOMER NAME</label>
          <div className="relative w-full flex items-center">
            <FaUser className="text-primary absolute left-3"/>
             <input type="text" name="name" className="input-field pl-10"/>
          </div>
         
        </div>

        <div className="booking-input">
          <p>SELECT SERVICE</p>
          <div className="relative w-full">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="border border-neutral-border rounded bg-neutral-dark w-full p-2 text-left flex justify-between items-center"
              >
                <span>{selectedService ? `${selectedService.name} - ${selectedService.price}` : 'Select a service'}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
              </button>

              {isOpen && (
                <div className="absolute z-50 w-full bg-neutral-dark border border-neutral-border rounded mt-1 max-h-48 overflow-y-auto">
                  {services.map(service => (
                    <div
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setServiceId(service.id);
                        setIsOpen(false);
                      }}
                      className="p-2 hover:bg-primary cursor-pointer flex items-center gap-1"
                    >
                     <AiOutlineScissor/> {service.name} - {service.price}
                    </div>
                  ))}
                </div>
              )}
            </div>
        </div>

        <div>
          <p>CHOOSE YOUR BARBER</p>
          <div className="flex w-full overflow-x-auto gap-4 py-4">
            {barbers.map(barber => (
              <BarberCard 
              barber={barber} 
              isSelected={barberId === barber.id}
              onClick={() => setBarberId(barber.id)}/>
            ))}
          </div>
       
        </div>

        <div className="booking-input">
          <label htmlFor="date">PREFERRED DATE</label>
          <div className="relative flex items-center" onClick={() => dateRef.current.showPicker()}>
            <MdDateRange className="absolute left-3 text-primary"/>
            <input type="date" name="date" className="input-field pl-10" ref={dateRef} onChange={e => setDate(e.target.value)}/>
          </div>

        </div>
        
      </div>
     
        <button onClick={handleBooking}>Book</button>
        </div>
  
    </div>
  )
}

export default BookingPage;