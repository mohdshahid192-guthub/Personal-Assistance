import { Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./Components/Home/Home"
function App() {

  return (
   <Routes>
    <Route element={<Layout/>}>
     <Route path="/" element={<Home/>} />
    </Route>
   </Routes>
  )
}

export default App
