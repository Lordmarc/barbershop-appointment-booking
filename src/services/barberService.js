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

