
const Barber = ({ image, name, specialist, experience }) => {

  return(
    <div className="flex flex-col items-center justify-center">
      <div className="p-2 h-40 w-40 overflow-hidden rounded-full border border-primary">
        <img src={image} alt="Barber_image" className="rounded-full w-full h-full object-cover" />
      </div>

      <div className="text-center flex flex-col">
        <p className="text-2xl">{name}</p>
        <span className="text-primary">{specialist}</span>
        <span className="text-slate-500">{experience}</span>
      </div>
     
    </div>
  );
}

export default Barber;