import axios from 'axios'
import {  useMutation } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'

export const useAiChat = () => {

  const abortControllerRef = useRef<AbortController | null>(null)

  const mutation = useMutation({
    mutationFn: async (query: string) => {
      abortControllerRef.current = new AbortController()
      const response = await axios.post("/api/v1/retrive/response/chat", {
    query
  }, {signal: abortControllerRef.current.signal})

  return response;
    }
   })

   const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
   }, [])

   return{
    ...mutation,
    abort
   }
   
}