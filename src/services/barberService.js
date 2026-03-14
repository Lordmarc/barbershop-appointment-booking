import { supabase } from "../lib/supabase"

export const getBarbers = async() => {
  const { data, error } = await supabase.from('barbers').select('*')

  if(error) throw error;
  return data
}

export const getTotalBarbers = async () => {
  const {count, error} = await supabase
  .from('barbers')
  .select('*', {count: 'exact', head: true})

  if(error) throw error;
  return count;
}

export const getServices = async() => {
  const { data, error } = await supabase.from('services').select('*')

  if(error) throw error
  return data
}

export const getTopBarbers = async () => {
  const { data,error } = await supabase
  .from('appointments')
  .select('barber_id, barbers(name,image)')
  .eq('status', 'completed');

  if (error) throw error;

  const barberCount = data.reduce((acc, appointment) => {
    const id = appointment.barber_id;
    if(!acc[id]){
      acc[id] = {
        barber_id: id,
        name: appointment.barbers.name,
        image: appointment.barbers.image,
        count: 0
      };
    }
    acc[id].count += 1;
    return acc;
  }, {});

  const topBarbers = Object.values(barberCount)
  .sort((a, b) => b.count - a.count)
  .slice(0, 3);

  return topBarbers;
}

