import {useState} from "react";

const useIncrement = (addAmount) => {
    const [count, setCount] = useState(0);
    const increase = () => {
        setCount((prevCount) => prevCount + addAmount);
    };
    return [count, increase];
}
export default useIncrement;