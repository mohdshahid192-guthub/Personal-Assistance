import HistoryElements from "./HistoryElements"
import {motion, stagger, type Variants} from 'framer-motion'



const listContainerVariant: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      delayChildren: stagger(0.05, { from: "last" }),
    }
  },
  center: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.15, { startDelay: 0.3 }),
    }
  }
}

const popUpAtActive: Variants = {
  hidden: {
    y: '30%',
    opacity: 0,
    transition: { duration: 0.15 } // Added soft exit transition duration for the items
  },
  center: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    }
  }
}

export default function ChatHistory() {
  
    return(
 
    

         <motion.ul
  variants={listContainerVariant}
    className="w-full h-full flex flex-col items-center p-2 gap-4">
  
  <motion.li 
  variants={popUpAtActive}
   
  className="w-full">
  <HistoryElements title="Hiii Bro how are you loresdfhaiusdg sdhghisdhfa sadgasiudh shdgyayu8asdgf asjdhgfiahgsduifh" />
  </motion.li>

  <motion.li 
  variants={popUpAtActive}
   
  className="w-full">
  <HistoryElements title="Hiii Bro how are you loresdfhaiusdg sdhghisdhfa sadgasiudh shdgyayu8asdgf asjdhgfiahgsduifh" />
  </motion.li>
   </motion.ul>
    
  
   )
   
}