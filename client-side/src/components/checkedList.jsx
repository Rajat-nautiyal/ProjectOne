import { useState , useEffect} from 'react'
import './App.css'

const games = ["volleyball", "football", "tennis"];

function App() {
  const [isChecked, setIsChecked] = useState({})
  const [copyArr, setCopyArr] = useState(games)

  const handleDelete =(val)=>{
     const updatedArr = copyArr.filter((k) => k!==val)
     setCopyArr(updatedArr)
  }
  const handleCheck =(val, key)=>{
    setIsChecked((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the checked state for the given key
    }));
    console.log(isChecked)

  }
  return (
    <>
      {copyArr.map((val, key)=>(
        <div className='flex justify-center' key={key}>
          <input type='checkbox' checked = {isChecked[key]||false}
           onChange={(e)=>handleCheck(val, key)}
          />
          <li>{val}</li>
          <button onClick={()=>handleDelete(val)} 
            disabled={!isChecked[key]}>
              delete
          </button>
        </div>
      ))}
    </>
  )
}

export default App
