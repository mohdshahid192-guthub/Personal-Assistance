import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleUser} from '@fortawesome/free-solid-svg-icons'
import WhiteBtn from '../Buttons/WhiteBtn';
import { useAppSelector } from '../../Store/hooks';

export default function Header() {
const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)


  return (
    <nav className="flex justify-between items-center h-16 px-4 text-2xl bg-black/50 text-white sticky cursor-pointer">
     
    <div className='relative group w-48 h-full inline-block'>
       <h1 className='absolute inset-0 text-lg font-bold max-sm:group-hover:opacity-0 flex items-center justify-start transition-opacity duration-200 sm:pointer-none:'>
      Shareen AI
     </h1>
     <div className='absolute flex items-center justify-start px-4 inset-0 opacity-0 max-sm:group-hover:opacity-100 transition-opacity duration-200 sm:pointer-none:'>
      <FontAwesomeIcon icon={faBars}/>
     </div>
    </div>
       
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