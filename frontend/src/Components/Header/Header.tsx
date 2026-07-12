import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare, faX} from '@fortawesome/free-solid-svg-icons'
import WhiteBtn from '../Buttons/WhiteBtn';
// import { useAppSelector } from '../../Store/hooks';
import { motion, AnimatePresence} from 'framer-motion'
import type { Variants } from 'framer-motion';
import { useEffect, useRef, useState  } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const slideAtActive: Variants = {
  hidden: {
    x: "-100%", 
    opacity: 0,
    pointerEvents: "none",
    transition: {
      x: { duration: 0.4, ease: "easeInOut" },
      opacity: { duration: 0.4 },
      pointerEvents: { delay: 0.4 } 
    }
  },
  center: {
    x: 0,
    opacity: 1,
    pointerEvents: "auto",
    transition: {
      x: { duration: 0.4, ease: "easeInOut" },
      opacity: { duration: 0.4 },
      pointerEvents: { delay: 0 } 
    }
  }
};


export default function Header() {
// const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
const [isActive, setIsActive] = useState(false)
 
    const sidebarRef = useRef<HTMLDivElement>(null)
    
   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isActive && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }
    window.addEventListener("click", handleClickOutside)

    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  
   }, [isActive, setIsActive])

  return (
    <nav className="flex justify-between items-center h-16 px-4 text-2xl bg-black/50 text-white sticky cursor-pointer "  >
     
    <div className='relative  w-48 h-full inline-block'>
       <h1 className='absolute hidden inset-0 text-lg font-bold  sm:flex items-center justify-start pointer-events-none'>
      Shareen AI
     </h1>
     <div className='absolute flex sm:hidden items-center justify-start inset-0' 
    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsActive((prev) => !prev);
  }}
     >
      {!isActive? (<FontAwesomeIcon icon={faBars}/>): (<FontAwesomeIcon icon={faX}/>)}
     </div>
    </div>
       
        <WhiteBtn size='small' variant='withoutBg'> <FontAwesomeIcon icon={faPenToSquare}  className='text-2xl'/> New Chat</WhiteBtn>

      {/* {isLoggedIn && (<button className='' ><FontAwesomeIcon icon={faCircleUser} className='text-3xl'/></button>)} */}

      {/* {!isLoggedIn && (
        <div className='flex  gap-2'>
    <WhiteBtn size='small' variant='withoutBg'>Login</WhiteBtn>
          <WhiteBtn size='small' variant='withBg' >Sign Up</WhiteBtn>
        </div>
    )} */}
       <AnimatePresence>
   {isActive && (
      <motion.div
         variants={slideAtActive}
         initial="hidden"
         animate="center"
         exit="hidden"
         
        ref={sidebarRef}
          className=" fixed sm:hidden inset-0 w-16  top-16 z-100 ">
        <Sidebar />
      </motion.div>
   )}

       </AnimatePresence>
       
    </nav>
  )
}