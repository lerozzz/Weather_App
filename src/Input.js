import { useState } from "react";

function Input(props) {
    const [input, setInput] = useState('');

    return (
        <div>
            <input type='text'
                placeholder='Enter city/town...'
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => props.seacrhPressed(input)}>Search</button>
        </div>)
}
export default Input;
