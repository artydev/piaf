import {create } from 'zustand'
import {persist}  from 'zustand/middleware'

interface Counter {
    value : number
    increment : ()=> void,
    reset: () => void
}

export const useCounterState = create(
    persist<Counter>(
        (set,get) => (
            {
                value : 0,
                increment : ()=> {
                    set((state)=>({value : state.value + 1}))
                },
                reset : () => {
                    set((state)=>({value : 0}))
                }
            }
        ),
        {
            name : 'counter'
        }
    )
)