import { useState } from "react";
import ChatInput from "../ChatInput/ChatInput";
import {easeInOut, motion} from 'framer-motion'

const popAtLoad = {
  hidden: {
    y: 100,
    opacity: 0
  },
  visible:{
    y: 0,
    opacity: 1,
    transition: { duration: 1 , easeInOut: "easeInOut", once: true}
  }
}


export default function Home(){
  const [chats, setChats] = useState(false)
  return(
    <div className="flex flex-col h-full w-full items-center justify-center">
    {!chats && (<motion.h1
    variants={popAtLoad}
    initial="hidden"
    animate= "visible"
    
     className="text-3xl md:text-4xl lg:text-5xl font-bold scale-y-150 font-sans pb-14">Let's Begin! Shahid</motion.h1>)}
      <ChatInput />
    </div>
  )
}