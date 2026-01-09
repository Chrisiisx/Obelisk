import { Route, Routes } from "react-router-dom"

import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ChangeMaster from "./pages/ChangeMaster"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changemaster" element={<ChangeMaster />} />
      </Routes>
    </>
  )
}

export default App
