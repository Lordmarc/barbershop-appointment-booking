import { supabase } from "../lib/supabase"

export const loginWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

export const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options:{
      redirectTo: window.location.origin
    }
  });
  if(error) throw error;
}

export const loginWithFacebook = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: window.location.origin
    }
  });

  if (error) throw error;
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) return null;

  const {data, error} = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single()
  if(error) throw error;
  return data;
};

export const registerAccount = async(email, password, fullName, phoneNumber,role) => {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phoneNumber,
        role
      }
    }
  });
  if(error) throw error;
  return data;
}

export const getCustomers = async () => {
  const now = new Date();

 
  const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(),1).toISOString().split('T')[0];
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
  const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];

  const [{ count: thisMonthTotal, error: error1 }, {count: lastMonthTotal, error: error2}, {data, error: error3 }] = await Promise.all([
    supabase
    .from('profiles')
    .select('*', {count: 'exact', head: true})
    .eq('role', 'user')
    .gte('created_at', firstDayThisMonth),

    supabase
    .from('profiles')
    .select('*', {count: 'exact', head: true})
    .eq('role', 'user')
    .gte('created_at', firstDayLastMonth)
    .lte('created_at', lastDayLastMonth),
    
      supabase
  .from('profiles')
  .select('*, appointments(id,date,status)')
  .eq('role', 'customer')
  .order('full_name', { ascending:true })
  ])


  if(error1 || error2 || error3)  throw error1 || error2 || error3;
 
  return {thisMonthTotal, lastMonthTotal, data};
}