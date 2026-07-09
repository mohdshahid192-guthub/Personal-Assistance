import { useEffect, useRef } from "react";
import ChatInput from "../ChatInput/ChatInput";
import { motion} from 'framer-motion'
import { ScrollArea } from "@/components/ui/scroll-area"
import {  useAppSelector } from "@/src/Store/hooks";
const popAtLoad = {
  hidden: {
    y: 50,
    opacity: 0
  },
  visible:{
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 , easeInOut: "easeInOut", once: true}
  }
}


export default function Home(){
 const chats = useAppSelector((state) => state.chat.messages)
 const hasChats = chats.length > 0

const messagesEndRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
}, [chats])




  return(
    <div className="flex flex-col h-full w-full items-center justify-center bg-slate-900 text-white ">

      
      <div className="flex-1 flex justify-center overflow-hidden w-full px-4 pt-8  ">
        {!hasChats ? (
          <motion.div
           variants={popAtLoad}
    initial="hidden"
    animate= "visible"
           className="flex h-full items-center justify-center ">
            <h1 className="text-4xl h-full flex flex-col justify-center md:text-5xl font-semibold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center transition-all duration-500 pb-26">
              Hello! Mohd Shahid
             <span> How can I help you today</span>
            </h1>
          </motion.div>
        ) : (
          
          <ScrollArea className="h-full w-full max-w-3xl pr-4">
            <div className="flex flex-col space-y-8 pb-32 pt-4 ">
              {chats.map((msg) => {
                const isUser = msg.sender === "Shahid";
                return (
                  <div
                    key={msg.id}
                    className={`flex  w-full ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex flex-col max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
                      
                      
                      <span className="text-xs text-gray-500 mb-1 ml-1 font-medium tracking-wide uppercase">
                        {msg.sender}
                      </span>
                      
                    
                      <div 
                        className={` px-5 py-3.5 text-[15px] leading-relaxed shadow-sm break-all  ${
                          isUser 
                            ? "bg-slate-800 rounded-2xl rounded-tr-sm text-gray-100" 
                            : "bg-transparent text-gray-200 border-l-2 border-purple-500/50 pl-4"
                        }`}
                      >
                        {msg.text}
                      </div>
                      
                    </div>
                  </div>
                );
              })}
              
              <div ref={messagesEndRef} className="h-1" />
            </div>
          </ScrollArea>
        )}
      </div>
   
     
      <ChatInput hasChats={hasChats}/>
    </div>
  )
}