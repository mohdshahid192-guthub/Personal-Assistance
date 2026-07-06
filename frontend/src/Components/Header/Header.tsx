import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faCircleUser} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import WhiteBtn from '../Buttons/WhiteBtn';
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <nav className="flex justify-between items-center bg-white  h-16 text-2xl">
      <div className='w-[100px] md:w-[150px] flex items-center justify-center'>
         <WhiteBtn size='small' variant='withoutBg'>
        <FontAwesomeIcon icon={faBars} className='text-2xl '/>
       </WhiteBtn>
      </div>
       
      {isLoggedIn && (<button className='pl-4'><FontAwesomeIcon icon={faCircleUser} className='text-3xl'/></button>)}

      {!isLoggedIn && (
        <div className='flex px-8 gap-2'>
    <WhiteBtn size='small' variant='withoutBg'>Login</WhiteBtn>
          <WhiteBtn size='small' variant='withBg'>Sign Up</WhiteBtn>
        </div>
    )}
    </nav>
  )
}