import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faUpload, faMagnifyingGlass, faComments, faCircleUser, faHome } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
import WhiteBtn from "../Buttons/WhiteBtn"
import { useAppSelector } from "@/src/Store/hooks"
import ChatHistory from "../ChatHistory/ChatHistory"
import { useState } from "react"
import { AnimatePresence, motion, type Variants } from "framer-motion"


const slideAtActive: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
    transition: {
      x: { duration: 0.35, ease: "easeInOut" },
      opacity: { duration: 0.25 },
    }
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { duration: 0.35, ease: "easeInOut" },
      opacity: { duration: 0.25 },
    }
  }
};


export default function Sidebar() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const [ChatHistoryActive, setChatHistoryActive] = useState(false)




  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between pb-8 pt-16 bg-black/75 text-white backdrop-blur-sm shadow-xl shadow-black ">




      <section className="w-full h-full flex flex-col gap-4">
        <NavLink
          to={"/"}
          onClick={() => setChatHistoryActive(false)}
          className={() =>
            `w-full h-12 flex items-center justify-center border-l-4 ${location.pathname === "/" && !ChatHistoryActive
              ? 'bg-slate-900 border-blue-600'
              : 'bg-none border-transparent hover:border-blue-600/50 hover:bg-gray-400/20'
            }`
          }
        >
          <FontAwesomeIcon icon={faHome} className="text-2xl" />
        </NavLink>
        <NavLink
          to={"/search"}
          onClick={() => setChatHistoryActive(false)}
          className={({ isActive }) =>
            `w-full h-12 flex items-center justify-center border-l-4 ${isActive && !ChatHistoryActive
              ? 'bg-slate-900 border-blue-600'
              : 'bg-none border-transparent hover:border-blue-600/50 hover:bg-gray-400/20'
            }`
          }

        >

          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-2xl" />

        </NavLink>

        <NavLink
          to={"/upload"}
          onClick={() => setChatHistoryActive(false)}
          className={({ isActive }) =>
            `w-full h-12 flex items-center justify-center border-l-4 ${isActive && !ChatHistoryActive
              ? 'bg-slate-900 border-blue-600'
              : 'bg-none border-transparent hover:border-blue-600/50 hover:bg-gray-400/20'
            }`
          }

        >
          <FontAwesomeIcon icon={faUpload} className="text-2xl" />

        </NavLink>


        <button

          onClick={(e) => {
            e.preventDefault();
            setChatHistoryActive((prev) => !prev)
          }}

          className={
            `w-full h-12 flex items-center justify-center border-l-4 cursor-pointer ${ChatHistoryActive
              ? 'bg-slate-900 border-blue-600'
              : 'bg-none border-transparent hover:border-blue-600/50 hover:bg-gray-400/20'
            }`
          }


        >
          <FontAwesomeIcon icon={faComments} className="text-2xl " />

        </button>


      </section>

      <section className="flex flex-col items-center justify-center gap-2 pb-2">


        {isLoggedIn && (<WhiteBtn size="small" variant="withoutBg"><FontAwesomeIcon icon={faCircleUser} className='text-3xl' /></WhiteBtn>)}
      </section>

      <AnimatePresence mode="popLayout">

        {ChatHistoryActive && (

          <motion.div
            variants={slideAtActive}
            initial="hidden"
            animate="center"
            exit="hidden"

            className="fixed bottom-0 left-16 top-0 sm:top-16 w-[calc(100vw-64px)] sm:left-20 sm:w-[calc(60vw-80px)] lg:w-[calc(40vw-80px)] bg-gray-950 rounded-r-4xl overflow-x-hidden ">

            <ChatHistory />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}