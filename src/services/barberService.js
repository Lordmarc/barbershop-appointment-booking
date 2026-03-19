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
   const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
  if(error) throw error
  return data
}

export const addNewService = async (serviceData) => {
  let imageUrl = null;

  if (serviceData.image) {
    const fileExt = serviceData.image.name.split('.').pop();
    const fileName = `${serviceData.name}-${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('services')
      .upload(fileName, serviceData.image);
    
    if (uploadError) throw uploadError; 

    const { data: { publicUrl } } = supabase.storage
      .from('services')
      .getPublicUrl(fileName);
      
    imageUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from('services')
    .insert({ name: serviceData.name, price: serviceData.price, image: imageUrl })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateService = async(editData) => {
 let imageUrl = editData.image;

      if (editData.image instanceof File) {
        const fileExt = editData.image.name.split('.').pop();
        const fileName = `${editData.name}-${Date.now()}.${fileExt}`;
        const {error: uploadError} = await supabase.storage
        .from('services')
        .upload(fileName, editData.image);

        if(uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
        .from('services')
        .getPublicUrl(fileName);
        imageUrl = publicUrl;

       
      }

      const { data, error } = await supabase
        .from('services')
        .update({ name: editData.name, price: editData.price, image: imageUrl })
        .eq('id', editData.id)
        .select()
        .single();

      if (error) throw error;

      return data;
}

export const deleteService = async(id) => {
  const { error } = await supabase
  .from('services')
  .delete()
  .eq('id', id)

  if(error) throw error;
}

export const getTopBarbers = async () => {
  const { data, error } = await supabase
    .from('appointments')
    .select('barber_id, barbers(name,image)')
    .eq('status', 'completed');

  if (error) throw error;

  const barberCount = data.reduce((acc, appointment) => {
    const id = appointment.barber_id;
    if (!acc[id]) {
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

  // i-convert sa array, i-sort by count descending
  const sorted = Object.values(barberCount).sort((a, b) => b.count - a.count);

  return sorted; // [{ barber_id, name, image, count: 5 }, ...]
}



export const getTopPerformer = async () => {
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
  .slice(0,1);

  return topBarbers;
}

export const addNewBarber = async(barberData) => {
    const fileExt = barberData.image.name.split('.').pop();
    const fileName = `${barberData.name}-${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('barbers')
      .upload(fileName, barberData.image);

    if (uploadError) throw uploadError;


    const { data: { publicUrl } } = supabase.storage
      .from('barbers')
      .getPublicUrl(fileName);


    const { data, error } = await supabase
      .from('barbers')
      .insert({
        name: barberData.name,
        specialty: barberData.specialty,
        shift: barberData.shift,
        image: publicUrl,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
}

export const updateBarber = async(id, barber) => {
let imageUrl = barber.image;

  if(barber.image instanceof File) {
    const fileExt = barber.image.name.split('.').pop();
    const fileName = `${id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('barbers')
      .upload(fileName, barber.image, { upsert: true });

    if(uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('barbers')
      .getPublicUrl(fileName);

    imageUrl = data.publicUrl;
  }
  const { data,error } = await supabase
  .from('barbers')
  .update({...barber, image: imageUrl})
  .eq('id', id)
  .select()
  .single()

  if(error) throw error;
  return data;
}

export const updateBarberStatus = async(id, status) => {
  const { error } = await supabase
  .from('barbers')
  .update(barber)
  .eq('id', id)

  if(error) throw error;
}

export const deleteBarber = async(id) => {
  const { error } = await supabase
  .from('barbers')
  .delete()
  .eq('id', id)

  if(error) throw error;
} 
