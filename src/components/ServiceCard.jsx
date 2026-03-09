
const ServiceCard = ({ service }) => {

  return(
    <div className="p-3 h-64 border border-slate-700/80 rounded-lg flex flex-col justify-center items-center flex-1">
      <div className="flex-1 h-40 w-40 rounded-lg overflow-hidden">
        <img src={service.image} alt=""  className="w-full h-full object-cover grayscale"/>
      </div>
      <p className="mt-4">{service.name}</p>
    </div>
  );
}

export default ServiceCard;