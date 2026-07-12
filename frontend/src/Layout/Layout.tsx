import {Outlet} from 'react-router-dom'
import { Header, Sidebar } from '../Components'

export default function Layout() {
  return(
    <div className="h-dvh grid grid-cols-1 sm:grid-cols-[80px_1fr] grid-rows-[64px_1fr] min-h-[calc(100vh-64px)] bg-[url('/bgVertical.jpg')] md:bg-[url('/bgLandscape.png')]  bg-cover bg-no-repeat bg-center">
      <header className='shrink-0 col-start-1 sm:col-start-2 row-start-1 z-10'>
      <Header />
      </header>

      <section className='hidden sm:block col-start-1 row-span-2 w-full z-20'>
      <Sidebar />
      </section>
        <main className="shrink sm:col-start-2 row-start-2 overflow-hidden z-0">
        <Outlet />
      </main>
    </div>
    
  )
}