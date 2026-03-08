import { supabase } from "../lib/supabase"

export const getAppointments = async () => {
  const { data, error } = await supabase.from('appointments').select('*')
  .order('created_at', {ascending:false})

  if(error) throw error;
  return data
}

export const createAppointment = async (appointment) => {
  const { data, error } = await supabase.from('appointments')
  .insert([appointment])
  .select()

  if(error) throw error;
  return data[0]
}

export const cancelAppointment = async(id) => {
  const { error } = await supabase.from('appointments')
  .update({ status: 'cancelled' })
  .eq('id', id)
  if(error) throw error
}