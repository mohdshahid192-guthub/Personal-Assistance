import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface Message{
  id: string
  text: string
  sender: string
  timestamp: string
}


interface Chat{
  messages: Message[]
  sessionId: string
  isChatActive: boolean
  isAiTyping: boolean
}

const initialState: Chat = {
    messages: [],
    sessionId: crypto.randomUUID(),
    isChatActive: true,
    isAiTyping: false
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    endChatSession: (state) =>  {
state.isChatActive = false
    },
    resetChat: (state) =>  {
      state.messages = [],
      state.sessionId = crypto.randomUUID(),
      state.isChatActive = true

    },
    setIsAiTyping: (state, action: PayloadAction<boolean>) => {
      state.isAiTyping = action.payload
    }
  }
})

export const {addMessages, endChatSession, resetChat, setIsAiTyping} = chatSlice.actions
export default chatSlice.reducer