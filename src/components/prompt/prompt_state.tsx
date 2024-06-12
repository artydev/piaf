import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IChatMessage {
    role: string,
    content: string
}

interface IPrompt {
    stored_messages: IChatMessage[],
    store_message: (message:IChatMessage) => void,
    clear_messages: () => void
}

export const usePromptState = create(
    persist<IPrompt>(
        (set, get) => (
            {
                stored_messages: [],
                store_message: (message : IChatMessage) => {
                    set((state) => ({stored_messages : [...state.stored_messages, message]}))
                 },
                clear_messages: () => { 
                    set(() => ({stored_messages : []}))
                },
                redim_stored_messages : () => {
                    alert("Max Mess")
                },
               
                
            }
        ),
        {
            name: 'prompt'
        }
    )
)

export type { IChatMessage }