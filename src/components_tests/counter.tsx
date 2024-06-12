
import { useCounterState } from "@/components_tests/counter_state";
import { useStore } from "zustand";

function Counter() {
    let { value, increment, reset } = useStore(useCounterState, (state) => state)
    return (
        <div>
            <h1>Zustand Persist State - NextJS</h1>
            <h1>{value}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={reset}>CLEAR</button>
        </div>
    )
}

export default Counter;