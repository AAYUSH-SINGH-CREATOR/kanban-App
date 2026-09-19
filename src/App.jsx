import Auth from "./components/Auth"
import Dashboard from "./components/Dashboard"
import { Route, Routes } from "react-router-dom"

export default function App(){

  return(
    <div>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="Dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  )
}