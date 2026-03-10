import { supabase } from "../lib/supabase";

export const uploadAvatar = async (userId, file) => {
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}.${fileExt}`;

  const { error } = await supabase.storage
  .from('avatars')
  .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl(filePath);

  return data.publicUrl;
};

export const updateProfile = async (userId, updates) => {
  const { error } = await supabase
  .from('profiles')
  .upsert({ id: userId, ...updates });

  if(error) throw error;
}

export const getProfile = async (userId) => {
  const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();

  if(error) throw error;
  return data;
}