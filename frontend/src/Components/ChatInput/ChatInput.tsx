import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faArrowUp, faPause} from "@fortawesome/free-solid-svg-icons"
import { useAiChat } from "@/src/Hooks/useAiChat";
import { useAppDispatch } from "@/src/Store/hooks";
import { addMessages, setIsAiTyping } from "@/src/Store/chatSlice";
import axios from "axios";

export default function ChatInput({hasChats = false}) {
     const [inputValue, setInputValue] = useState<string>("")
     const dispatch = useAppDispatch()
     const aiChat = useAiChat()


    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
       e.preventDefault()

       if (aiChat.isPending) {
        aiChat.abort()
        return
       }
       if (!inputValue.trim()) {
        return
       }
       const currentText = inputValue

       dispatch(addMessages({
        id: crypto.randomUUID(),
        text: currentText,
        sender: "Shahid",
        timestamp: new Date().toString()
       }))

       setInputValue("")
      dispatch(setIsAiTyping(true))

       aiChat.mutate(currentText, {
        
        onSuccess:(response) => {
          const answer = response.data.data.answer
           dispatch(addMessages({
            id: crypto.randomUUID(),
            text: answer,
            sender: "AI",
            timestamp: new Date().toString()
           }))

        },
        onError: (error) => {
 if (axios.isCancel(error)) {
  console.log("User stopped generation");
  
  dispatch(addMessages({
    id: crypto.randomUUID(),
    text: "Generation stopped by User",
    sender: "System",
    timestamp: new Date().toString()
  }))

  return
 }


        console.error("API Error:", error);
        dispatch(addMessages({
          id: crypto.randomUUID(),
          text: "Sorry, I am having trouble connecting to the server right now.",
          sender: "AI",
          timestamp: new Date().toISOString(),
        }
      ));
      },
      onSettled: () => {
        dispatch(setIsAiTyping(false))
      }
       })
    }

    const handleBtnSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(e)
      }
    }

  return(
   <form onSubmit={handleSubmit}  className={`w-[90%] sm:w-[70%] md:w-[60%] h-max rounded-lg border-2 border-white/50 bg-black/40 backdrop-blur-sm fixed  ${hasChats? "bottom-0 mb-12": "sm:bottom-1/5 bottom-0 mb-12"} transition-all duration-300 grid grid-cols-[1fr_60px] sm:grid-cols-[1fr_80px]`}>
     <div className="w-[85%] h-full rounded-lg flex items-center overflow-hidden">
     <textarea 
  id="chat-input"
  onKeyDown={handleBtnSubmit}
  value={inputValue}
  rows={1}
  
  placeholder="Ask Anything"
  className="w-full resize-none max-h-48 overflow-y-auto bg-transparent pl-3 py-2 text-white outline-none placeholder:text-gray-300 "
  onInput={(e) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  }}
  onChange={(e) =>  setInputValue(e.target.value)}
   disabled={aiChat.isPending}
/>

     </div>

 <div className="h-full w-full flex items-end justify-center p-2">
               <button
              
               type="submit" className="flex h-8 w-8 sm:h-10 sm:w-10 rounded-full items-center bg-blue-600  justify-center text-center hover:bg-blue-700 cursor-pointer">
      {aiChat.isPending? (<FontAwesomeIcon icon={faPause} className="sm:text-lg text-sm text-white"/>): (<FontAwesomeIcon icon={faArrowUp} className="text-sm sm:text-lg text-white"/>)}
     </button>
       </div>
      
     
   </form>
  )
}