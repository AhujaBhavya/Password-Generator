import { useState, useCallback, useEffect, useRef} from 'react'
import backgroundImage from './assets/bg-image.jpg';
function App() {
  const [length, setLength] = useState(8)
  const[numAllowed, setNumAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false) 
  const[password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)
  
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-+=[]{}"
    //loop to generate random password
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) 
    }
    setPassword(pass) //to read the value
  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select() 
    passwordRef.current?.setSelectionRange(0, 25) 
    window.navigator.clipboard.writeText(password)
  }, [password])
   
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
     <div className="min-h-screen bg-cover bg-center flex justify-center items-center" 
           style={{ backgroundImage: 
           `url(${backgroundImage})`, 
           backgroundSize: 'cover', 
           backgroundRepeat: 'no-repeat',
           backgroundPosition: 'center',
           minHeight: '100vh',
           }}>
     <div className='w-full max-w-lg  mx-auto shadow-2xl rounded-lg px-8 py-6 my-8 text-orange-600 bg-gray-800'>
      <h1 className='text-3xl text-white text-center font-bold my-4 mb-10 mx-10'>Password Generator</h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
      value = {password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef} 
      />
      <button 
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-700 hover:bg-orange-600  text-white px-3 py-0.5 shrink-0'>Copy</button>
     </div>
     <div className='flex text-sm gap-x-10 mb-10'>
      <div className='flex items-center gap-x-3'>
        <input
        type="range"
        min = {8}
        max = {25}
        value = {length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
        type = "checkbox"
        id='numberInput'
        onChange={() => {
          setNumAllowed((prev) => !prev) 
        }}
        defaultChecked = {numAllowed}
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
        type = "checkbox"
        id='numberInput'
        onChange={() => {
          setCharAllowed((prev) => !prev) 
        }}
        defaultChecked = {charAllowed}
        />
        <label htmlFor="numberInput">Characters</label>
      </div>
     </div>
     </div>
     </div>
    </>
  )
}

export default App
