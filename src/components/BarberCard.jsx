

const BarberCard = ({ barber, onClick, isSelected }) => {

  return (
    <div className={`barber-card cursor-pointer transition-all duration-200 ${isSelected ? 'border-[#86c559]  ' : 'border-neutral-border'}`} onClick={onClick}>
      <div  className="w-24 h-24 rounded-full overflow-hidden">
        <img src={barber.image} alt="" />
      </div>
      <p className="">{barber.name}</p>
    </div>
  );
}

export default BarberCard;