import React ,{ useEffect, useState } from 'react'
import './App.css'
import AddTask from './components/AddTask'
import ToDo from './components/ToDo';
import { useDrag, useDrop } from 'react-dnd';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);
  console.log(taskList);

  const [{isOver}, drop] = useDrop(()=>({
    accept:"todo",
    drop:(item) => addToCompleted(item.id, item.projectName, item.taskDescription, item.timestamp, item.duration),
    collect: (monitor) =>({
      isOver: !!monitor.isOver(),
    })
  }))

  const addToCompleted = (id, projectName, taskDescription, timestamp, duration) =>{
    const moveTask = taskList.filter((task) => id === task.id);
    setCompleted((completed)=> [...completed, {moveTask, projectName, taskDescription, timestamp, duration}])

  }

  useEffect(()=>{
    let array = localStorage.getItem("taskList");
    if(array){
      setTaskList(JSON.parse(array))
    }
  },[])

  return (
    <div className="">
      <h1 className='text-2xl font-bold py-4 pl-6 uppercase'>The Task Tracker</h1>
      <p className='text-xl font-bold pl-6 mb-2'>Hey There !</p>
      <div className='flex flex-row item-center'>
        <p className='text-xl my-2 pl-6'>Click </p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className='text-xl my-2'>to add a new task</p>
      </div>
      <div className='flex flex-row justify-around'>
        <div className='w-full'>
          <h2 className='my-6 mx-6 text-xl font-bold bg-gray-600 w-3/4 max-w-lg p-2'>To Do List:</h2>
          <div>
            {taskList.map((task,i)=>
                <ToDo key={i} task={task} index={i} taskList={taskList} setTaskList={setTaskList} />
        )}
            
          </div>
          
        </div>
        <div className='w-full flex flex-col' ref={drop}>
        <h2 className='my-6 mx-6 text-xl font-bold bg-gray-600 w-3/4 max-w-lg p-2 mb-1'>Completed:</h2>
        {completed.map((task,i)=>
              <ToDo key={i} task={task} taskList={taskList} setTaskList={setTaskList} />
        )}
        </div>

      </div>
      
      
    </ div>
  )
}

export default App
