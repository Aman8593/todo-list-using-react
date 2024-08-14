"use client"
import React, { useState } from 'react'

const page = () => {
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [maintask, setmaintask] = useState([])
  
  const submitHandler = (e) => {
    e.preventDefault();
    setmaintask([...maintask, { title, desc, completed: false }])
    console.log(maintask)
  }

  const deleteHandler = (i) => {
    let copyTask = [...maintask]
    copyTask.splice(i, 1);
    setmaintask(copyTask); 
  }

  const toggleComplete = (i) => {
    let updatedTasks = [...maintask];
    updatedTasks[i].completed = !updatedTasks[i].completed;
    setmaintask(updatedTasks);
  }

  let renderTask = <h2>No Tasks Available</h2>

  if (maintask.length > 0) {
    renderTask = maintask.map((t, i) => {
      return (
<div className="flex flex-col md:flex-row items-center justify-center hover:bg-gray-200 transition duration-200 ease-in-out mb-4" key={i}>
  <div className={`flex flex-col items-start p-6 bg-gray-100 rounded-lg shadow-lg w-96 ${t.completed ? 'bg-green-100' : 'bg-slate-100'}`}>
    <input 
      type="checkbox" 
      checked={t.completed} 
      onChange={() => toggleComplete(i)} 
      className="h-5 w-5 text-green-600 rounded focus:ring-0 cursor-pointer mb-4"
    />
    <div className='w-full'>
      <h2 className={`text-lg font-semibold mb-2 ${t.completed ? 'line-through text-gray-500' : 'text-black'}`}>
        {t.title}
      </h2>
      <h6 className={`text-gray-700 ${t.completed ? 'line-through text-gray-400' : ''}`}>
        {t.desc}
      </h6>
    </div>
  </div>
  <button 
    onClick={() => deleteHandler(i)} 
    className='bg-red-600 text-white px-4 py-2 text-lg font-bold rounded hover:bg-red-500 transition duration-200 ease-in-out mt-4 md:mt-0 md:ml-4'>
    Delete
  </button>
</div>

      )
    })
  }
  
  return (
    <>
      <h1 className='bg-black text-white p-10  text-2xl text-center'>To-Do List</h1>
      <form className='flex flex-col md:flex-row items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg' onSubmit={submitHandler}>
        <input type="text" 
          className='text-2xl border-zinc-800 border-4 px-4 py-2 m-5'
          placeholder='Enter Task Here'
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <input type="text" 
          className='text-2xl border-zinc-800 border-4 px-4 py-2 m-5'
          placeholder='Enter Description Here'
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
       <button className='bg-purple-800 text-white px-4 py-2 text-2xl m-5 font-bold rounded hover:bg-purple-700 transition duration-200 ease-in-out transform hover:scale-105'>
  Add Task
</button>

      </form>
      <hr/>
      <div className='p-10 bg-slate-100'>
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  )
}

export default page
