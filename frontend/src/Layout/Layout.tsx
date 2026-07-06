import {Outlet} from 'react-router-dom'
import { Header, Sidebar } from '../Components'

export default function Layout() {
  return(
    <div className='h-screen grid grid-cols-1 sm:grid-cols-[100px_1fr] md:grid-cols-[150px_1fr] grid-rows-[64px_1fr]'>
      <header className='col-span-2 row-start-1'>
      <Header />
      </header>

      <section className='hidden sm:block col-start-1 row-start-2 w-full '>
      <Sidebar />
      </section>
        <main className='col-start-1 sm:col-start-2 row-start-2 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]'>
        <Outlet />
      </main>
    </div>
    
  )
}