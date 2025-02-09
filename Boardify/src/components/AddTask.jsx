import React, { use } from 'react'
import '../App.css'
import { useState } from 'react'


const AddTask = ({taskList, setTaskList}) => {
    const [addModal, setAddModal] = useState(false);
    const [projectName, setprojectName] = useState("");
    const [taskDescription, settaskdescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleAdd = e =>{
        e.preventDefault;
        if(!projectName){
            setErrorMessage("Enter a Project name to continue")
        } else {
            let timestamp = new Date();
            let tempList = taskList;
            tempList.push({
                projectName,
                taskDescription,
                timestamp:timestamp,
                duration :0
            })
            localStorage.setItem("taskList", JSON.stringify(tempList))
            window.location.reload()
            // setTaskList(
            //     [...taskList, {projectName, taskDescription, timestamp:timestamp}]
            // )
            setAddModal(false);
            setprojectName("");
            settaskdescription("");
        }
    }
    const handleInput =e =>{
        const {name, value} = e.target;

        if(name === "projectName"){
            setprojectName(value);
            setErrorMessage('');
        } 
        if(name === "projectName" && value === " "){
            setErrorMessage("Enter a Project name to continue")
        }
        if(name === "taskDescription") settaskdescription(value)
    }
  return (
    <div>
      <button className=' bg-blue-500 text-white uppercase text-sm font-semibold py-1 mx-1.5 pl-2 pr-2.5 rounded hover:opacity-70 mt-1.5' type='button' onClick={() => setAddModal(true)}>+ New</button>
      {addModal ? (
        <>
            <div className='flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100'>
                <div className='w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col'>
                    <div className='flex flex-row justify-between border-b border-slate-200 rounded-t p-5'>
                        <h3 className='text-black text-3xl font-semibold'>Add new Task</h3>
                        {/* <button className='px-1 py-1 mb-1 text-[#000] float-right text-4xl loading-none font-semibold block' onClick={()=>setAddModal(false)}>x</button> */}
                    </div>
                    <form className='p-6' action="">
                        <div className='flex flex-col items-start gap-0'>
                            <label htmlFor="project-name" className='text-black text-xl font-semibold  text-left mb-2'>Project Name:</label>
                            <input type="text" placeholder='Project Name' id='project-name' className='w-full bg-gray-200 text-gray-700 border p-1 border-gray-200 rounded-md loading-tight focus:outline-none focus:bg-white mb-4' required name='projectName' value={projectName} onChange={handleInput}/>
                            <p className='text-red-500 text-center mt-2 mb-5'>{errorMessage}</p>
                        </div>
                        <div className='flex flex-col items-start gap-0'>
                            <label htmlFor="task-description" className='text-black text-xl font-semibold  text-left mb-2'>Task Description</label>
                            <textarea className='w-full bg-gray-200 text-gray-700 border p-1 border-gray-200 rounded-md loading-tight focus:outline-none focus:bg-white' id="task-description" rows="4" placeholder='Task Description' name='taskDescription' value={taskDescription} onChange={handleInput}></textarea>
                        </div>
                    </form>
                    <div className='flex justify-end p-6'>
                        <button className='bg-red-500 mb-4 mx-6 font-semibold hover:opacity-70 transition duration-300' onClick={()=>setAddModal(false)}>Cancel</button>
                        <button className='bg-blue-500 mb-4 font-semibold hover:opacity-70 transition duration-300' onClick={handleAdd}>Add Task</button>
                    </div>
                </div>
            </div>
        </>
      ) : null}
    </div>
  )
}

export default AddTask
