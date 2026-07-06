import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faUpload, faMagnifyingGlass, faComments } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import WhiteBtn from "../Buttons/WhiteBtn"
import { useState } from "react"

export default function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return(
    <div className="w-full h-full flex flex-col items-center justify-between py-4">
      <section className="flex flex-col gap-4">
          <Link
          to={"/"}
          className="w-full border-2 p-2 rounded-xl hover:bg-black hover:text-white flex gap-2 text-nowrap items-center justify-center md:justify-start"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="text-lg"/>
            <p className="hidden md:block font-semibold text-xs">New Chat</p>
          </Link>
          <Link
          to={"/"}
          className="w-full border-2 p-2 rounded-xl hover:bg-black hover:text-white flex gap-2 text-nowrap items-center justify-center md:justify-start "
          >
            
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-2xl"/>
            <p className="hidden md:block font-semibold text-xs">Search</p>

          </Link>
          
          <Link
          to={"/"}
          className="w-full border-2 p-2 rounded-xl hover:bg-black hover:text-white flex gap-2 text-nowrap items-center justify-center md:justify-start"
          >
            <FontAwesomeIcon icon={faUpload} className="text-2xl"/>
            <p className="hidden md:block font-semibold text-xs">Upload</p>

          </Link>
          <Link
          to={"/"}
          className="w-full border-2 p-2 rounded-xl hover:bg-black hover:text-white flex gap-2 text-nowrap items-center justify-center md:justify-start"
          >
            <FontAwesomeIcon icon={faComments} className="text-2xl "/>
            <p className="hidden md:block font-semibold text-xs">Chats</p>

          </Link>
          
          
      </section>

      <section className="flex flex-col items-center justify-center gap-2 pb-2">
        
          <WhiteBtn size="small" variant="withoutBg">Settings</WhiteBtn>
         {isLoggedIn && ( <WhiteBtn size="small" variant="onlyBorder">Logout</WhiteBtn>)}
        
      </section>
    </div>
  )
}