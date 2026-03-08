import { supabase } from "../lib/supabase"

export const getBarbers = async() => {
  const { data, error } = await supabase.from('barbers').select('*')

  if(error) throw error;
  return data
}

export const getServices = async() => {
  const { data, error } = await supabase.from('services').select('*')

  if(error) throw error
  return data
}