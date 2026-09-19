import { useEffect, useState } from "react"
import Auth from "./components/Auth"
import Dashboard from "./components/Dashboard"
import { Route, Routes, Navigate } from "react-router-dom"
import { supabase } from "./components/supabase"

export default function App() {

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then((result) => {
      const session = result.data.session
      setSession(session)
    })

    const authListener = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
      }
    )
    return () => {
      authListener.data.subscription.unsubscribe()
    }
  }, [])


  return (
    <div>
      <Routes>
        <Route path="/" element={session ? <Navigate to="/dashboard"/> : <Auth />} />
        <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/"/>} />
      </Routes>
    </div>
  )
}