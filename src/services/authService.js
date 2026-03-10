import { supabase } from "../lib/supabase"

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
  return user;
};

export const registerAccount = async(email, password, fullName, phoneNumber) => {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phoneNumber
      }
    }
  });
  if(error) throw error;
  return data;
}