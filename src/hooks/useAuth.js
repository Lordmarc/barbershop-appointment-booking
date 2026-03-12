import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase";

export const useAuth = () => {
  const [ user, setUser ] = useState(undefined);
  const [ profile, setProfile ] = useState(null);

  const fetchProfile = async (userId) => {
    const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

    setProfile(data)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: {session} }) => {
      setUser(session?.user ?? null)
      if(session?.user) fetchProfile(session.user.id);
    })

    const { data: listener } = supabase.auth.onAuthStateChange(( _event,session ) => {
      setUser(session?.user ?? null)
      if(session?.user) fetchProfile(session.user.id);
      else setProfile(null);
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return { user, profile }
}