import { useEffect, useRef } from "react";
import ChatInput from "../ChatInput/ChatInput";
import { motion} from 'framer-motion'
import { ScrollArea } from "@/components/ui/scroll-area"
import {  useAppSelector } from "@/src/Store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

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
const isAiTyping = useAppSelector((state) => state.chat.isAiTyping)
const messagesEndRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
}, [chats])




  return(
    <div className="flex flex-col h-full w-full items-center justify-center text-white bg-black/50">
  
      
      <div className="flex-1 flex justify-center overflow-hidden w-full px-4 pt-8  ">
        {!hasChats ? (
          <motion.div
           variants={popAtLoad}
    initial="hidden"
    animate= "visible"
           className="flex h-full items-center justify-center ">
            <h1 className="text-4xl h-full flex flex-col justify-center md:text-5xl font-semibold bg-linear-to-r from-blue-200 to-purple-300 bg-clip-text text-transparent text-center transition-all duration-500 pb-40">
              Hello! Mohd Shahid
             <span> How can I help you today</span>
            </h1>
          </motion.div>
        ) : (
          
          <ScrollArea className="h-4/5 w-full max-w-3xl pr-4">
            <div className="flex flex-col space-y-8 pb-32 pt-4 ">
              {chats.map((msg) => {
                const isUser = msg.sender === "Shahid";
                const isSystem = msg.sender === "System"
                return (
                  <div
                    key={msg.id}
                    className={`flex  w-full ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex flex-col max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
                      
                      
                     {!isSystem && ( <span className="text-xs text-gray-500 mb-1 ml-1 font-medium tracking-wide uppercase">
                        {msg.sender}
                      </span>)}
                      
                    
                      {!isSystem && (
                        <div 
                        className={` px-5 py-3.5 text-[15px] leading-relaxed shadow-sm  ${
                          isUser
                            ? "bg-slate-800 rounded-2xl rounded-tr-sm text-gray-100" 
                            : "bg-transparent text-gray-200 border-l-2 border-purple-500/50 pl-4"
                        } `}
                      >
                        {msg.text} 
                      </div>
                    )}

                    {isSystem && (
                      <div className=" px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ">
                         <span><FontAwesomeIcon icon={faWarning} /></span> {msg.text}
                      </div>
                    )}
                      
                    </div>
                  </div>
                );
              })}

              {isAiTyping && (
                <div className="flex w-full justify-start">
                  <div className="flex flex-col max-w-[85%] items-start">
                    <span className="text-xs text-gray-500 mb-1 ml-1 font-medium tracking-wide uppercase">
                      AI
                    </span>
                    <div className="px-5 py-3.5 text-[15px] leading-relaxed shadow-sm break-all bg-transparent text-gray-200 border-l-2 border-purple-500/50 pl-4 animate-pulse flex items-center space-x-2">
                      Thinking...
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} className="h-1" />
            </div>
          </ScrollArea>
        )}
      </div>
   
     
      <ChatInput hasChats={hasChats}/>
    </div>
  )
}