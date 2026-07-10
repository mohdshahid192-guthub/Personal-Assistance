import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faFilePdf, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

export type activeMethodType = "text" | "url" | "pdf"

export default function Upload () {
  const [activeMethod, setActiveMethod] = useState<activeMethodType>("text")

  const [file, setFile] = useState<File | null>(null)
  return(
  <div className=" w-full h-full flex items-center justify-center bg-black/50 ">
    <div className="w-3/4 md:w-1/2  h-3/4 md:h-3/4 bg-gray-200/10 rounded-lg text-white flex flex-col justify-start items-center backdrop-blur-sm ">
         <div className="w-full h-max grid grid-cols-3 place-items-center  px-6 py-2 gap-2">
             <button className={`w-full h-10 font-bold rounded-sm cursor-pointer  ${activeMethod === "text"? "bg-gray-200/20 backdrop-blur-sm text-white ": "bg-none hover:bg-gray-100/10 hover:backdrop-blur-sm"} transition-colors duration-300`} onClick={() => setActiveMethod("text")}>TEXT</button>
             <button className={`w-full h-10 font-bold rounded-sm cursor-pointer ${activeMethod === "url"? "bg-gray-200/20 backdrop-blur-sm  text-white": "bg-none hover:bg-gray-100/10 hover:backdrop-blur-sm"} transition-colors duration-300`} onClick={() => setActiveMethod("url")}>URL</button>
             <button className={`w-full h-10 font-bold rounded-sm cursor-pointer ${activeMethod === "pdf"? "bg-gray-200/20 backdrop-blur-sm  text-white": "bg-none hover:bg-gray-100/10 hover:backdrop-blur-sm"} transition-colors duration-300`} onClick={() => setActiveMethod("pdf")}>PDF</button>
         </div>

         <form className="w-full h-full px-4 py-2 flex flex-col gap-4">
         <div className="flex flex-col w-full gap-2">
           <label htmlFor="title" className="font-semibold">
            Document's Title <span className="text-red-700">*</span>
          </label>
          <input id="title" type="text" className="bg-none outline-blue-500 rounded-sm h-8 px-4 border-2 border-gray-500" placeholder="Enter title here..."/>
         </div>
         
         {activeMethod === "text" && (
          <div className="flex flex-col w-full gap-2 h-2/3">
            
              <label htmlFor="text" className="font-semibold">
            Content <span className="text-red-700">*</span>
          </label>
          <textarea id="text" className="bg-none outline-blue-500 rounded-sm h-full px-4 border-2 border-gray-500 resize-none  p-2" placeholder="Enter RAW Text here..."/>

         </div>
         )}
         {activeMethod === "url" && (
          <div className="flex flex-col w-full gap-2 h-2/3">
            
              <label htmlFor="text" className="font-semibold">
            Document URL <span className="text-red-700">*</span>
          </label>
          <textarea id="text" className="bg-none outline-blue-500 rounded-sm h-full px-4 border-2 border-gray-500 resize-none p-2" placeholder="Enter URL Link ..."/>

         </div>
         )}
         {activeMethod === "pdf" && (
          <div className="flex flex-col w-full gap-2 h-2/3">
            
              <label htmlFor="file" className="font-semibold">
            Select File <span className="text-red-700">*</span>
          </label>

          <div className="relative w-full h-full">
            <input type="file" accept=".pdf,application/pdf" className="absolute z-10 w-full h-full inset-0 opacity-0 cursor-pointer" 
            onChange={(e) => {if(e.target.files && e.target.files.length > 0) {setFile(e.target.files[0])}}}/>

            <div className="bg-none outline-blue-500 rounded-sm h-full px-4 border-2 border-gray-500 grid place-items-center  p-2 text-gray-500">
              {!file? (<div>Select Your file <span> <FontAwesomeIcon icon={faFilePdf} /> </span></div> ) : (<div><span> <FontAwesomeIcon icon={faFilePdf} /> </span> {file.name}</div>) }
            </div>
          </div>
       

         </div>
         )}

         <button type="submit" className="w-full bg-blue-600 rounded-sm h-10 text-white font-semibold tracking-wider hover:bg-blue-700">
          Upload <span><FontAwesomeIcon icon={faPaperPlane}/></span>
         </button>
         
         </form>
    </div>
  </div>
  )
}