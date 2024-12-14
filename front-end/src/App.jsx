import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const App = () => {
    const [input, setInput] = useState("")
    const [todo, setTodo] = useState(null)

    useEffect(() =>{
      async function  getData(){
        const response = await axios('http://localhost:3000/todo')
      console.log(response.data)
      setTodo(response.data.todos)
      }
          getData()
    },[])

    //delete 
    const deletetodo=async(id) =>{
      console.log('delete')
      const response = await axios.delete(`http://localhost:3000/todo/${id}`)
      
    }


    // edit
    const edittodo =async(id)=>{
      console.log('edit')
      const updated = prompt('enter updated val')
      const response = await axios.put(`http://localhost:3000/todo/${id}` , {
        title: updated
      })
      console.log(response.data)
      
    }



    //add
    const  addTodo = async(e)=>{
      e.preventDefault()
      console.log(input);

      const response = await axios.post('http://localhost:3000/todo' , {
        title: input
      })
      
    }

    //all todo





  return (
    <>
    <h1>todo App </h1>
    
    <form onSubmit={addTodo}>
    <input onChange={e => setInput(e.target.value)} type="text"  placeholder='enter todo'/>
    <button type='submit'>add todo</button>
    </form>

        {todo && todo.map(t => <li key={t.id}>{t.title}
          <button onClick={()=>deletetodo(t.id)}>delete</button>
          <button onClick={()=>edittodo(t.id)}>edit</button>
          
          </li>)}

  



    </>
  )
}

export default App