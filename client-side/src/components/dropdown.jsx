import { useState , useEffect} from 'react'
import './App.css'
//copy N paste to App.js
const countries = [
  {name: 'india',value: 'IN', cities:[
    "Delhi",
    "Bangalore"
  ]},{name: 'japan',value: 'JP', cities:[
    "kyuto",
    "tokyo"
  ]},{name: 'china',value: 'CH', cities:[
    "hongkong",
  ]}
]
function App() {
  const [country, setCountry] = useState("");

  useEffect(()=>{
    setCountry(countries[0].name)
  },[])
  return (
    <>
      <div className=''>
        <select onChange={(e)=>setCountry(e.target.value.split(" ")[0])}>
          {countries.map((value, index)=>(
              <option key={index} >
                {value.name} {value.value} 
              </option>
          ))
          }        
        </select>
        {/* 2nd drop down */}
        {country && <select>
          {countries.find((value,index)=> value.name===country).cities.map((val, key)=>(
            <option key={key}>{val}</option>
          ))}        
        </select>}
      </div>
    </>
  )
}

export default App
