import React, { useEffect, useState } from 'react'
import EditTask from './EditTask'
import { useDrag } from 'react-dnd';

const ToDo = ({task, index, taskList, setTaskList}) => {

  const [time, setTime] = useState(task.duration);
  const [running, setRunning] = useState(false);
  const [isDragging, drag] = useDrag(()=>({
    type:'todo',
    item:{
      id:index,
      projectName:task.projectName,
      taskDescription: task.taskDescription,
      timestamp: task.timestamp,
      duration: task.duration
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }))

  useEffect(()=>{
    let interval;
    if(running){
      interval = setInterval(()=>{
        setTime((prevTime) => prevTime + 10)
      },10)
    } else if(!running){
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running])

  const handleDelete = itemID =>{
    let removeindex = taskList.indexOf(task);
    taskList.splice(removeindex,1);
    // setTaskList((currentTasks => currentTasks.filter(todo => todo.id !== itemID)
    // ))
    localStorage.setItem("taskList", JSON.stringify(taskList))
    window.location.reload();
  }

  const handleStop = () =>{
    setRunning(false);
    
    let taskIndex = taskList.indexOf(task);
    taskList.splice(taskIndex, 1, {
      projectName:task.projectName,
      taskDescription:task.taskDescription,
      timestamp:task.timestamp,
      duration: time
    });

    localStorage.setItem("taskList", JSON.stringify(taskList))
    window.location.reload();
  }


  return (
    <div>
      <div ref={drag} className='flex, flex-col items-start bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg  justify-start text-[#000]'>
      <div className='flex flex-row justify-between'>
      <p className='font-semibold text-2xl'>{task.projectName}</p>
      <EditTask task={task} index={index} taskList={taskList} setTaskList={setTaskList} />

      </div>
        <p className='text-lg py-2'>{task.taskDescription}</p>
        <div className='w-full flex flex-col sm:flex-row items-center justify-center sm:justify-evenly mb-4'>
          <div className='sm:w-1/4 font-semibold  text-xl py-4'>
            <span>{("0" + Math.floor((time / 3600000) % 24 )).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 60000) % 60 )).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60 )).slice(-2)}:</span>
            <span className='text-sm'>{("0" + ((time / 10) % 100 )).slice(-2)}</span>
          </div>
          <div className='flex gap-2 '>
            {running ? (
              <button onClick={handleStop}>Stop</button>
            ) : (
              <button onClick={()=>{setRunning(true)}}>Start</button>
            )}
            <button onClick={()=>{setTime(0)}}>Reset</button>
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <button className='bg-red-500 text-white font-semibold opacity-100 hover:opacity-60 transition-opacity duration-200' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ToDo
