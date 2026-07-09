import {Outlet} from 'react-router-dom'
import { Header, Sidebar } from '../Components'

export default function Layout() {
  return(
    <div className='h-screen grid grid-cols-1 sm:grid-cols-[80px_1fr] grid-rows-[64px_1fr] '>
      <header className='col-start-1 sm:col-start-2 row-start-1 '>
      <Header />
      </header>

      <section className='hidden sm:block col-start-1 row-span-2 w-full'>
      <Sidebar />
      </section>
        <main className='sm:col-start-2 row-start-2 overflow-hidden '>
        <Outlet />
      </main>
    </div>
    
  )
}