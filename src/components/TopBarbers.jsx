import { MdStarOutline } from "react-icons/md";


const TopBarbers = ({ topThree }) => {

  return (
    <div className="border border-neutral-border p-4 rounded-md w-72 bg-primary/10">
        <div className="flex items-center gap-2 font-semibold mb-4">
          <MdStarOutline className="text-primary"/>
          <p>Top Barbers</p>
        </div>
        <ul className="flex flex-col gap-2">
          {topThree.map(t => (
            <li key={t.barber_id}>
              <div className="flex items-center gap-2">
                <img src={t.image} alt="" className="h-10 w-10 rounded-full"/>

                <div>
                  <p>{t.name}</p>
                  <span className="text-slate-500">{t.count} appointments</span>
                </div>
              </div>
            </li>
            ))}
         
        </ul>
    </div>
  );
}

export default TopBarbers;