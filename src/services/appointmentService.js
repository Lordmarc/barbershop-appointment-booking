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

export const getBookingStats = async() => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const [{count: todayCount}, {count: yesterdayCount}] = await Promise.all([
    supabase
    .from('appointments')
    .select('*', {count: 'exact', head: true})
    .eq('date', today),
    supabase 
    .from('appointments')
    .select('*', {count: 'exact', head: true})
    .eq('date', yesterday)
  ]);

  return { todayCount, yesterdayCount };
} 

export const getPercentageChange = (today, yesterday) => {
  if(yesterday === 0) return 100;
  const percentage = ((today - yesterday)/ yesterday) * 100;
  return percentage.toFixed(1);
} 

export const getRevenue = async () => {
  const now = new Date();

  const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(),1).toISOString().split('T')[0];
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
  const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];

  const [{ data:thisMonthData, error:error1}, {data:lastMonthData, error: error2 }] = await Promise.all([
    supabase
    .from('appointments')
    .select('services(price)')
    .eq('status', 'completed')
    .gte('date', firstDayThisMonth),

    supabase
    .from('appointments')
    .select('services(price)')
    .gte('date', firstDayLastMonth)
    .lte('date', lastDayLastMonth)

  ])

  if(error1 || error2) throw error1 || error2;

  const thisMonthTotal = thisMonthData.reduce((sum, a) => sum + (a.services?.price ?? 0),0);
  const lastMonthTotal = lastMonthData.reduce((sum, a) => sum + (a.services?.price ?? 0), 0);

  return { thisMonthTotal, lastMonthTotal }

}

