import React, { useEffect, useState } from 'react'


const EditTask = ({task, taskList, setTaskList}) => {
    const [editModal, setEditModal] = useState(false);
    const [projectName, setprojectName] = useState("");
    const [taskDescription, settaskdescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=>{
        setprojectName(task.projectName);
        settaskdescription(task.taskDescription);
    },[])
    
    const handleUpdate = e =>{
            e.preventDefault;
            if(!projectName){
                setErrorMessage("Enter a Project name to continue")
            } else {
                let taskIndex = taskList.indexOf(task);
                taskList.splice(taskIndex, 1, {
                    projectName:projectName,
                    taskDescription:taskDescription,
                    timestamp:task.timestamp,
                    duration:task.duration
                });
                localStorage.setItem("taskList", JSON.stringify(taskList));
                window.location.reload();
                // setTaskList(
                //     [...taskList, {projectName, taskDescription}]
                // )
                setEditModal(false); 

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
      <button className='' onClick={()=>setEditModal(true)}>Edit</button>
      {editModal ? (
        <div>
            <div className='flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100'>
                <div className='w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col'>
                    <div className='flex flex-row justify-between border-b border-slate-200 rounded-t p-5'>
                        <h3 className='text-black text-3xl font-semibold'>Edit Task</h3>
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
                        <button className='bg-red-500 mb-4 mx-6 font-semibold hover:opacity-70 transition duration-300 text-[#fff]' onClick={()=>setEditModal(false)}>Cancel</button>
                        <button className='bg-blue-500 mb-4 font-semibold hover:opacity-70 transition duration-300 text-[#fff]' onClick={handleUpdate}>Update Task</button>
                    </div>
                </div>
            </div>
        </div>
      ) : null}
    </div>
  )
}

export default EditTask
