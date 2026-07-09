import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser} from '@fortawesome/free-solid-svg-icons'
import WhiteBtn from '../Buttons/WhiteBtn';
import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { login, logout } from '../../Store/authSlice';

export default function Header() {
const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

const dispatch = useAppDispatch()

  return (
    <nav className="flex justify-between items-center h-16 px-4 text-2xl bg-slate-900 text-white sticky">
     
     <h1 className='text-lg font-bold '>
      Shareen AI
     </h1>
       
      {isLoggedIn && (<button className='' ><FontAwesomeIcon icon={faCircleUser} className='text-3xl'/></button>)}

      {!isLoggedIn && (
        <div className='flex  gap-2'>
    <WhiteBtn size='small' variant='withoutBg'>Login</WhiteBtn>
          <WhiteBtn size='small' variant='withBg' >Sign Up</WhiteBtn>
        </div>
    )}
    </nav>
  )
}