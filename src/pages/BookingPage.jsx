import { useEffect, useRef, useState } from "react";
import { useAppointments } from "../store/AppointmentContext"
import { createAppointment } from "../services/appointmentService";
import { getBarbers, getServices } from "../services/barberService";
import BarberCard from "../components/BarberCard";
import Navbar from "../components/Navbar";
import BookingImage from "../assets/HeroImage.jpg";
import { FaUser } from "react-icons/fa";
import { AiOutlineScissor } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useAuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM'
]

const BookingPage = () => {
  const { user, profile } = useAuthContext();
  const { dispatch } = useAppointments();
  const [ date, setDate ] = useState('');
  const [ timeSlot, setTimeSlot ] = useState('');
  const [ barberId, setBarberId ] = useState('');
  const [ serviceId, setServiceId ] = useState('');
  const [ barbers, setBarbers ] = useState([]);
  const [ services, setServices ] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const dateRef = useRef();
  const navigate = useNavigate()

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
    if(!user){
      navigate('/login');
      return
    }
    if(!date || !timeSlot || !barberId || !serviceId ){
      alert("Fill all the fields")
      return;
    }
    try{
      dispatch({ type: 'SET_LOADING' })
      const newAppointment = await createAppointment({
        customer_name: profile?.full_name,
        user_id: user.id,
        date,
        time_slot: timeSlot,
        barber_id: barberId,
        service_id: serviceId,
        status: 'pending'
      })
      dispatch({ type: 'ADD_APPOINTMENT', payload: newAppointment })

      toast.success('Booking Successfully!')
      navigate('/profile')
      setDate('');
      setTimeSlot('');
      setBarberId('');
      setServiceId('');
      setSelectedService(null);
    }catch(error){
      dispatch({ type: 'SET_ERROR', payload:  error.message })
      toast.error('Booking failed')
    }
  }



  return(
  <div className="min-h-screen bg-[#0f1309] w-full pt-16">
    <Navbar/>
    <div className="max-w-5xl  w-full mx-auto flex flex-col p-4 gap-6">
      
      {/* Hero Image */}
      <div className="rounded-2xl h-60 w-full relative overflow-hidden border border-white/[0.07]">
        <img src={BookingImage} alt="" className="w-full h-full object-cover brightness-75"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1309]/90 via-black/40 to-transparent"/>
        <div className="absolute bottom-6 left-6 z-10">
          <p className="text-[#f0ede6] text-3xl font-bold">Book Your</p>
          <p className="text-[#86c559] text-3xl font-bold">Experience</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">

        {/* Customer Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Customer Name</label>
          <div className="relative flex items-center">
            <FaUser className="text-[#86c559] absolute left-3"/>
            <input 
              type="text" 
              className="w-full bg-[#1a1f14] border border-white/[0.07] rounded-xl px-4 py-2.5 pl-9 text-sm text-[#f0ede6] outline-none" 
              value={profile?.full_name ?? ''} 
              disabled
            />
          </div>
        </div>

        {/* Select Service */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Select Service</label>
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#1a1f14] border border-white/[0.07] rounded-xl w-full px-4 py-2.5 text-left flex justify-between items-center text-sm text-[#d4cfc6] hover:border-[#86c559]/50 transition-all"
            >
              <span>{selectedService ? `${selectedService.name} - PHP ${selectedService.price}` : 'Select a service'}</span>
              <span className="text-[#86c559]">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
              <div className="absolute z-50 w-full bg-[#1e241a] border border-white/[0.07] rounded-xl mt-1 max-h-48 overflow-y-auto shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                {services.map(service => (
                  <div
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      setServiceId(service.id);
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 hover:bg-white/[0.06] cursor-pointer flex items-center gap-2 text-sm text-[#d4cfc6] border-b border-white/[0.04] last:border-0"
                  >
                    <AiOutlineScissor className="text-[#86c559]"/>
                    <span>{service.name}</span>
                    <span className="ml-auto text-[#86c559] font-semibold">PHP {service.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Choose Barber */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Choose Your Barber</label>
          <div className="flex w-full overflow-x-auto gap-3 py-2">
            {barbers.map(barber => (
              <BarberCard 
                key={barber.id}
                barber={barber} 
                isSelected={barberId === barber.id}
                onClick={() => setBarberId(barber.id)}
              />
            ))}
          </div>
        </div>

        {/* Preferred Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Preferred Date</label>
          <div className="relative flex items-center" onClick={() => dateRef.current.showPicker()}>
            <MdDateRange className="text-[#86c559] absolute left-3"/>
            <input 
              type="date" 
              className="w-full bg-[#1a1f14] border border-white/[0.07] rounded-xl px-4 py-2.5 pl-9 text-sm text-[#f0ede6] outline-none hover:border-[#86c559]/50 transition-all [&::-webkit-calendar-picker-indicator]:hidden cursor-pointer"
              ref={dateRef} 
              value={date} 
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Time Slots */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Available Time Slots</label>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map(time => (
              <div 
                key={time} 
                onClick={() => setTimeSlot(time)}
                className={`border rounded-xl text-center py-3 text-sm cursor-pointer transition-all
                  ${timeSlot === time 
                    ? 'border-[#86c559] bg-[#86c559]/10 text-[#86c559] font-semibold' 
                    : 'border-white/[0.07] text-[#d4cfc6] hover:border-[#86c559]/50 hover:bg-white/[0.04]'
                  }`}
              >
                {time}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Book Button */}
     {user ? (
  <button 
    onClick={handleBooking} 
    className="flex items-center justify-center rounded-xl py-4 gap-2 w-full bg-[#86c559] text-[#0f1309] font-bold text-lg hover:bg-[#86c559]/80 transition-all shadow-[0_4px_24px_rgba(134,197,89,0.25)]"
  >
    <FaRegCalendarCheck/>
    <p>BOOK APPOINTMENT</p>
  </button>
) : (
  <button 
    onClick={() => navigate('/login')}
    className="flex items-center justify-center rounded-xl py-4 gap-2 w-full bg-[#1a1f14] border border-[#86c559]/30 text-[#86c559] font-bold text-lg hover:bg-[#86c559]/10 transition-all"
  >
    <FaRegCalendarCheck/>
    <p>LOGIN TO BOOK</p>
  </button>
)}

    </div>
  </div>
)
}

export default BookingPage;