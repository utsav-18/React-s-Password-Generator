import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed){
      str += "0123456789";
    }
    if(charAllowed){
      str += "!@#$%^&*()_+=[]{}`~";
    }
    for (let i = 0; i < length; i++){
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,passwordGenerator,charAllowed])

  const copyPasswordToClipboard = useCallback(()=> {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password);
  },[password])

  return (
    <> 
    <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-2 mt-4'>
              <input type="text" value={password} ref={passwordRef} className='outline-none w-full py-1 px-3 bg-white' placeholder='password' readOnly/>
              <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer'>Copy</button>
        </div>
              <div className='flex-row text-sm gap-x-2'>
                <div className='flex items-center gap-x-2'>
                  <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(Number(e.target.value))}}/>
                  <label htmlFor="">Length : {length} </label>
                  <input type="checkbox" Checked={numberAllowed} className='cursor-pointer' id="numberInput" onChange={()=>{setNumberAllowed((prev)=> !prev);}} />
                  <label htmlFor="numberInput">Numbers</label>
                  <input type="checkbox" Checked={charAllowed} className='cursor-pointer' id="charInput" onChange={()=>{setCharAllowed((prev)=> !prev);}} />
                  <label htmlFor="charInput">Characters</label>
                </div>
              </div>
    </div>
    </>
  )
}

export default App
