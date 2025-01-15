import { useEffect, useState } from "react";


function ActionCounter0({count, setCount}) {

    const [input, setInput] = useState('');

    useEffect(() => {
        setCount(count + 1);
    }, [input]);

    return (
        <div>
            <input
        type="text"
        placeholder="Type something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
        </div>
    )


} 

export default ActionCounter0;