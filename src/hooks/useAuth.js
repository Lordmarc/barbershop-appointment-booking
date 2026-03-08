import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase";

export const useAuth = () => {
  const [ user, setUser ] = useState(undefined);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const { data: listener } = supabase.auth.onAuthStateChange(( _event,session ) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return { user }
}