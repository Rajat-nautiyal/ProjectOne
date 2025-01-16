import { useState , useRef, useEffect} from 'react'
import './App.css'

function App() {
  const [items, setItems]= useState([]);
  const [updateId, setUpdateId] = useState("");

  const url = "http://localhost:5000/list"
  const inputRef = useRef();

  const handleUpdate = async(id)=>{
    const list = inputRef.current.value;
    await fetch (`${url}/update/${id}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({list})
    })
    fetchList()    
  }

  const handleDelete = async(_id)=>{
    await fetch (`${url}/delete`,{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id})
    })
    fetchList()    
  }
  const addList = async ()=>{
    const list = inputRef.current.value;
    const res = await fetch(`${url}/post`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({list})
    })
    const data = await res.json();
    setItems((prev)=>[...prev, data.newListPost])
    inputRef.current.value = ""
    
  }

  const fetchList = async () => {
    try {
        const response = await fetch(`${url}/get`);
        const data = await response.json(); 
        setItems(data.lists)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div>
      <h3 className='w-full flex justify-center my-3 font-bold text-3xl'>ToDO list</h3>
      <div className='w-full h-full flex justify-center'>
        <input type ='text' ref = {inputRef}
        className='outline-none focus:outline-none focus:ring-2 ring-1 ring-gray-400 focus:ring-blue-500  
        rounded-lg shadow-sm focus:border-blue-500 hover:shadow-lg hover:ring-1
        hover:ring-blue-500 transition-all
          w-[25%]'
        />
        <span 
          onClick={addList}
          className='bg-blue-600 p-3 rounded-lg ml-2 text-[#ffff] cursor-pointer'
        >
          Add
        </span>
      </div>
      <div className='w-full max-h-screen overflow-y-scroll my-2'>
        {items && items.map(({list, _id})=>(
          <div key={_id} 
           className='w-full flex justify-center '>
            {updateId === _id ?
            <span 
              onClick={()=>handleUpdate(_id)}
              className='py-2 mt-3 px-3 mr-3 bg-blue-600 rounded-2xl font-semibold
              text-white text-center flex items-center cursor-pointer'
            >
              Update
            </span>:null}
            <div 
            onClick={()=>{inputRef.current.focus(), setUpdateId(_id)}}
            className='bg-yellow-500 max-w-[40%] mr-3 mt-3 py-4 font-semibold 
            text-center rounded-2xl text-white px-4'>
              {list}
            </div>
            <span onClick={()=>handleDelete(_id)}
              className='py-2 mt-3 px-3 bg-red-500 rounded-2xl font-semibold text-white
                text-center flex items-center cursor-pointer'
            >
              Delete
            </span>
          </div>
      ))}
      </div>
    </div>
  )
}

export default App
