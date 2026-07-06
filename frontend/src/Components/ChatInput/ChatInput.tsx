import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
export default function ChatInput() {
  const [chats, setChats] = useState(false)

  return(
   <div    className={`w-[90%] sm:w-[70%] md:w-[60%] h-max rounded-lg border-2 bg-white fixed  ${chats? "bottom-0 mb-12": "bottom-1/3"} transition-all duration-300 grid grid-cols-[1fr_80px]`}>
     <div className="w-[85%] h-full rounded-lg flex items-center overflow-hidden">
     <textarea 
  id="chat-input"
  rows={1}
  placeholder="Message Shareen..."
  className="w-full resize-none max-h-48 overflow-y-auto bg-transparent px-3 py-2 text-gray-800 outline-none"
  onInput={(e) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  }}
/>

     </div>

 <div className="h-full w-full flex items-end justify-center p-2">
               <button className="flex h-12 w-12 rounded-full items-center bg-black  justify-center text-center hover:bg-gray-700">
    <FontAwesomeIcon icon={faPaperPlane} className="text-xl text-white"/>
     </button>
       </div>
      
     
   </div>
  )
}