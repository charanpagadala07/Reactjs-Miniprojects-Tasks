import React, { useState } from 'react'
import './App.css'

const Calculator = () => {
    const [input, setinput] = useState('');
    const [result,setresult] = useState(0);
    const resulthandler = e =>{
        setresult(eval(input))
    }
    const changehandler = e =>{
        setinput(e.target.value);
    }
  return (
    <div>
        <input type="text" value={input} name='input' onChange={changehandler} />
        {/* <button onClick={resulthandler} className='Resultbutton'>Result</button> */}
        <h1 style={{color:'#fff'}}>{result}</h1>
        <div id='grid'>
            <button onClick={() => setinput(input+'1')}>1</button>
            <button onClick={() => setinput(input+'2')}>2</button>
            <button onClick={() => setinput(input+'3')}>3</button><br />
            <button onClick={() => setinput(input+'4')}>4</button>
            <button onClick={() => setinput(input+'5')}>5</button>
            <button onClick={() => setinput(input+'6')}>6</button><br />
            <button onClick={() => setinput(input+'7')}>7</button>
            <button onClick={() => setinput(input+'8')}>8</button>
            <button onClick={() => setinput(input+'9')}>9</button><br />
            <button onClick={() => setinput(input+'+')}>+</button>
            <button onClick={() => setinput(input+'0')}>0</button>
            <button onClick={() => setinput(input+'-')}>-</button><br />
            <button onClick={() => setinput(input+'*')}>*</button>
            <button onClick={() => setinput(input+'/')}>/</button>
            <button onClick={() => setinput(input+'%')}>%</button><br />
            <button onClick={() => setinput('')} style={{backgroundColor:'#d32f2f'}}>AC</button>
            <button onClick={resulthandler} className='Resultbutton'>Result</button>
        </div>
    </div>
  )
}

export default Calculator
