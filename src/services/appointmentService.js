import { supabase } from "../lib/supabase"

export const getAppointments = async (page = 1, itemsPerPage = 5, status = 'all', startDate ='', endDate = '', barber= "all") => {
  const start = (page - 1) * itemsPerPage; 
  const end = start + itemsPerPage - 1;
  let query = supabase
  .from('appointments')
  .select('*, services(name,price), barbers(name,image), profiles(email) ', {count: 'exact'})
  .order('created_at', {ascending:false})
  .range(start,end);

  if(status !== 'all') query = query.eq('status', status);
  if (barber !== 'all') query = query.eq('barber_id', barber);
  if(startDate && endDate){
    query = query.gte('date', startDate).lte('date', endDate);
  }

  const { data, count, error } = await query;

  if(error) throw error;
  return { data, count }
}

export const getCustomerAppointment = async(userId) => {
  const {data,error} = await supabase
  .from('appointments')
  .select(`*, services(name,price), barbers(name, image)`)
  .eq('user_id', userId)
  .order('created_at', {ascending:false})
  .limit(1)
  .single()
  if(error) throw error
  return data;

}

export const getAppointmentStatusCount = async () => {
  const { data,error } = await supabase
  .from('appointments')
  .select('*, services(name,price), barbers(name,image), profiles(email) ')
  .order('created_at', {ascending: false})

  if (error) throw error;

  const statusCount = data.reduce((acc, appointment) => {
    const status = appointment.status;
    if(!acc[status]){
      acc[status] = 0;
    }
    acc[status] += 1;
    return acc;
  }, {});


  return { data, statusCount};
}

export const getTodayAppointments = async(page = 1, itemsPerPage = 5) => {

  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' });


  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage - 1;

  const { data, count, error } = await supabase
    .from('appointments')
    .select('*, services(name,price), barbers(name,image), profiles(email)', { count: 'exact' })
    .eq('date', today)
    .order('created_at', { ascending: false })
    .range(start, end);

  if (error) throw error;
  return { data, count };
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
 
export const updateStatus = async(id, status)=> {
  const {error} = await supabase
  .from('appointments')
  .update({ status })
  .eq('id', id)

  if(error) throw error;
}

export const deleteAppointment = async(id) => {
  const {error} = await supabase
  .from('appointments')
  .delete()
  .eq('id', id)

  if(error) throw error;
}

export const getWeeklyChart = async() => {
  
  const toManilaDate = (date) => 
    new Date(date).toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' });

  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);

  const { data, error } = await supabase
    .from('appointments')
    .select('date, services(price)')
    .eq('status', 'completed')
    .gte('date', toManilaDate(monday))  // ✅
    .lte('date', toManilaDate(today))   // ✅

  if (error) throw error;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const revenue = days.map((day, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = toManilaDate(date); // ✅

    const total = data
      .filter(a => a.date === dateStr)
      .reduce((sum, a) => sum + (a.services?.price ?? 0), 0);

    return { day, revenue: total };
  });

  return revenue;
}
