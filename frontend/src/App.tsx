import { Route, Routes, Navigate } from "react-router-dom"
import Layout from "./Layout/Layout"
import { Home, Upload } from "./Components"
import LandingLayout from "./Layout/LandingLayout"
import { useAppSelector } from "./Store/hooks"
import LandingPage from "./Components/LandingPage/LandingPage"
import LoginPage from "./Components/LoginPage/LoginPage"
function App() {

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)


  return (
   <Routes>
     {!isLoggedIn && (
      <Route element={<LandingLayout/>}>
     <Route path="/landing" element={<LandingPage/>} />
     <Route path="/login" element={<LoginPage/>} />
     <Route path="*" element={<Navigate to="/landing" replace />} />
    </Route>
     )}

    {isLoggedIn && (
      <Route element={<Layout/>}>
     <Route path="/" element={<Home/>} />
     <Route path="/upload" element={<Upload/>} />
     <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
    )}
   
   </Routes>
  )
}

export default App
