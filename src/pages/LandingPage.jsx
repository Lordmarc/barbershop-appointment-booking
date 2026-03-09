import Navbar from "../components/navbar";
import HeroImage from "../assets/HeroImage.jpg";
import leo from "../assets/leo.png";
import ric from "../assets/ric.png";
import taloy from "../assets/taloy.png"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServices } from "../services/barberService";
import ServiceCard from "../components/ServiceCard";
import Barber from "../components/Barber";
import MapLocation from "../components/MapLocation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async() => {
      const data = await getServices();
      setServices(data);
    }
    fetchServices();
  },[])

  console.log("Services Data:", services)
  return(
    <div className="w-full max-w-7xl mx-auto ">
      <Navbar/>
      <div className="flex flex-col gap-4 w-full">
        <div className="rounded-lg overflow-hidden w-full relative">
          <img src={HeroImage} alt="" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/60 to-transparent"></div>
          <div className="absolute text-white z-10  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
            <p className="text-2xl font-bold">Book Your Haircut in Seconds</p>
            <div className="mb-8">
              <span className="text-slate-500">Experience the gold standard of </span>
              <span className="text-primary">Grooming.</span>
            </div>
            <Link className=" bg-primary text-black font-semibold p-2 rounded-lg shadow-primary">Book Appointment</Link>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4">
          
          <p className="text-xl">Signature Service</p>
           <div className="flex  w-full overflow-x-auto gap-4 ">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        <div className="bg-neutral-dark border-y border-slate-700/50 flex flex-col gap-8 items-center justify-center p-4">
            <div className="flex flex-col items-center justify-center">
              <span className="text-primary">OUR ARTISANS</span>
              <p className="text-4xl ">Meet the Masters</p>
            </div>
            <div className="flex flex-col gap-4">
              <Barber image={leo} name="Leo Jay" specialist="Head Barber" experience="lLorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ratione tenetur voluptas, ullam odit non!"/>
              <Barber image={ric} name="Jeric C." specialist="Fade Specialist" experience="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur obcaecati temporibus earum cum, aliquid odit." />
              <Barber image={taloy} name="Taloy" specialist="Tapper Specialist" experience="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur obcaecati temporibus earum cum, aliquid odit."/>
            </div>
        </div>

        <div className="p-4 flex flex-col-reverse gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-4xl">Visit the Studio</p>
              <span className="text-slate-500">Located in the heart of the design district, providing a sanctuary for the discerning man.</span>
            </div>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 ">
                <FaMapMarkerAlt className="text-primary"/>
                <div className="text-slate-400">
                  <p>Blk 8 Lot 7 Sepvhoai Ibayo Tipas</p>
                  <p>Taguig City, Philippines, 1630</p>
                </div>
                
              </li>
               <li className="flex gap-2">
                <FaClock className="text-primary"/>
                <div className="text-slate-400">
                  <p>Mon - Fri: 9:00 AM - 8:00 PM </p>
                  <p>Sat - Sun: 10:00 AM - 6:00 PM</p>
                </div>
                
              </li>

               <li className="flex gap-2">
                <FaPhoneAlt className="text-primary"/>
                  <p className="text-slate-400">(+63) 09123456789</p>
              </li>
            </ul>
          </div>
          
          <MapLocation/>
        </div>
      </div>
     
     <Footer/>
    </div>
  );
}



export default LandingPage;