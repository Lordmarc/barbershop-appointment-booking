import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const LoginPage = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword] = useState("");
  const [ error, setError ] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      navigate('/admin')
    }
  } 

  return(
    <div>
      <h1>Login</h1>
      { error && <p>{ error }</p> }
      <input type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} required />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}


export default LoginPage;