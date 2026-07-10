import { Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import { Home, Upload } from "./Components"
function App() {

  return (
   <Routes>
    <Route element={<Layout/>}>
     <Route path="/" element={<Home/>} />
     <Route path="/upload" element={<Upload/>} />
    </Route>
   </Routes>
  )
}

export default App
