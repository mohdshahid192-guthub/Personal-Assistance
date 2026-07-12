import {Outlet} from 'react-router-dom'


export default function LandingLayout() {
  return(
    <main className="h-dvh bg-[url('/bgVertical.jpg')] md:bg-[url('/bgLandscape.png')]  bg-cover bg-no-repeat bg-center">
       
        <Outlet />
    
    </main>
    
  )
}