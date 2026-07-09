import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faUpload, faMagnifyingGlass, faComments, faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
import WhiteBtn from "../Buttons/WhiteBtn"
import { useState } from "react"

export default function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div className="w-full h-full flex flex-col items-center justify-between pb-8 pt-16 bg-slate-950/95 text-white ">




      <section className="w-full h-full flex flex-col gap-4">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `w-full h-12 flex items-center justify-center border-l-4 ${isActive
              ? 'bg-slate-900 border-blue-600'
              : 'bg-none border-transparent hover:border-blue-600/50 hover:bg-gray-400/20'
            }`
          }
        >
          <FontAwesomeIcon icon={faPenToSquare} className="text-2xl" />
        </NavLink>
        <NavLink
          to={"/search"}
          className={({ isActive }) =>
            `w-full h-12 flex items-center justify-center  border-l-4 ${isActive
              ? 'bg-slate-900 border-blue-600'
              : 'bg-none border-transparent hover:border-blue-600/50 hover:bg-gray-400/20'
            }`
          }

        >

          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-2xl" />

        </NavLink>

        <NavLink
          to={"/upload"}
          className={({ isActive }) =>
            `w-full h-12 flex items-center justify-center border-l-4 ${isActive
              ? 'bg-slate-900 border-blue-600'
              : 'bg-none border-transparent hover:border-blue-600/50 hover:bg-gray-400/20'
            }`
          }

        >
          <FontAwesomeIcon icon={faUpload} className="text-2xl" />

        </NavLink>
        <NavLink
          to={"/chat-history"}
          className={({ isActive }) =>
            `w-full h-12 flex items-center justify-center border-l-4 ${isActive
              ? 'bg-slate-900 border-blue-600'
              : 'bg-none border-transparent hover:border-blue-600/50 hover:bg-gray-400/20'
            }`
          }


        >
          <FontAwesomeIcon icon={faComments} className="text-2xl " />

        </NavLink>


      </section>

      <section className="flex flex-col items-center justify-center gap-2 pb-2">

       
        {!isLoggedIn && (<WhiteBtn size="small" variant="withoutBg"><FontAwesomeIcon icon={faCircleUser} className='text-3xl'/></WhiteBtn>)}
      </section>
    </div>
  )
}