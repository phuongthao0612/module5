import React from "react";
import useIncrement from "../useIncrement";


const Counter1 = () => {
    const [count, increase] = useIncrement(1);
    return (
        <div>
            <h2>Counter 1: {count}</h2>
            <button onClick={increase}>Add 1</button>
        </div>
    );
};
export default Counter1;