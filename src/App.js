import React, {useState, useEffect} from "react";
import "../src/App.css";


let Task=({task, index, handleEdit, handleComplete, handleRemove})=>{

  return(
    <>
    <div className="task" style={{textDecoration: task.complete ? "line-through" : "", color: "red", fontSize: "large"}}>

    <span style={{color:"black"}}>{task.title}</span>
    <button onClick={()=>handleEdit(index)} style={{backgroundColor: "blueviolet"}}>Edit</button>
    <button onClick={()=>handleComplete(index)} style={{backgroundColor: "blue"}}>Done</button>
    <button onClick={()=>handleRemove(index)} style={{backgroundColor: "red"}}>Delete</button>

    </div>
    </>
  );
};

let App=()=>{

  let[tasks, setTasks]=useState([
    {
      title: "Demo 1",
      complete: true,
    },

    {
      title: "Demo 2",
      complete: false
    }
  ]);



  let addTask=(title)=>{  //Add task function.
    let newTask = [...tasks, {title, complete:false }]; //Coping all the array elements in newTask variable and set complete status to false.
    setTasks(newTask);   //Adding the new task in newTask variable then passing the newTask variable into setTasks variable.
  };

  let[taskIndex, setTaskIndex]=useState(null);
  let[editTask, setEditTask]=useState("");

  let handleEdit=(index)=>{ // Edit Button function.
    setTaskIndex(index);  //Passing the index into setTaskIndex variable.
    setEditTask(tasks[index].title);  //Passing the task title index into setEditTask variable.
  };

  let handleEditSave=()=>{    //Save Edit Button function.    
    let newTask = tasks.map((task, index)=> index === taskIndex ? {...task, title: editTask} : task); //Breif explanation given at line number 134 about this code syntax.
    setTasks(newTask);
    setTaskIndex(null);
    setEditTask("");
  };

  let handleComplete=(index)=>{ //Done Button function.
    let newTask = [...tasks];   // Taking new variable and using spread operator to copy all the array elements into newTask variable.
    newTask[index].complete = true; //Taking that variable index and changing the status
    setTasks(newTask);  //After marking the task we are passing the newTask variable into setTasks variable.
    alert(`Task Completed : ${tasks[index].title}`); //Displaying which task has been completed.
  };

  let handleRemove=(index)=>{ //Remove Function.
    let newTask = [...tasks]; // Taking new variable and using spread operator to copy all the array elements into newTask variable.
    newTask.splice(index, 1); //Using splice method we are removing the task using it's index number.
    setTasks(newTask);  ////After splice process passing the newTask variable into setTasks variable.
    alert(`Task Deleted : ${tasks[index].title}`); //Displaying which task has been deleted.
  };

  let[completeTask, setCompleteTask]=useState(0);
  let[pendingTask, setPendingTask]=useState(0);

  useEffect(()=>{
    setCompleteTask(tasks.filter(task => task.complete).length);
  },[tasks]);

  useEffect(()=>{
    setPendingTask(tasks.filter(task => !task.complete).length);
  },[tasks]);

  return(
    <>
    <div className="Todo-App">
    <h1>Todo App</h1>

    <div className="todo-Status">
      <ul>
        <li>Tasks Completed ({completeTask})</li>
        <li style={{color: "red"}}>Tasks Pending ({pendingTask})</li>
      </ul>
    </div>

    <div className="taskMap">
      {tasks.map((task, index)=>(
        <Task task={task} index={index} key={index}  NewAddTask={NewAddTask} handleEdit={handleEdit} handleComplete={handleComplete} handleRemove={handleRemove} />
      ))}
    </div>

    <div className="editTask">
      { taskIndex !== null && ( // taskIndex !== null: This is a condition used to determine whether the JSX code inside the parentheses should be rendered.  &&: This logical AND operator is used for conditional rendering. If taskIndex !== null evaluates to true, the JSX code after && will be rendered. If taskIndex is null, nothing will be rendered.  
        <div className="editing-Task">
          <input type="text" value={editTask} onChange={(e)=>setEditTask(e.target.value)} id="edit-Task" placeholder="Edit Task" autoComplete="off"/>
          <button onClick={handleEditSave}>Save Edit</button>
        </div>
      )}
    </div>


    <div className="new-Task-Adding">
      <NewAddTask addTask={addTask}/>
    </div>


    </div>
    </>
  );
};


let NewAddTask=({addTask})=>{

  let[newTask, setNewTask]=useState("");

  let handleSubmit=(data)=>{
    data.preventDefault();
    if(!newTask) return; /* If no value given then just return*/
    
    addTask(newTask); /* If new value given then pass into new parameter */
    setNewTask(""); /* Then set setNewTask variable nothing*/
    
    alert(`Task Added : ${newTask}`); //Displaying which task has been added to todo.
  };

  return(
    <>
    <input type="text" value={newTask} onChange={(e)=>setNewTask(e.target.value)} id="newTask" placeholder="Add New Task" autoComplete="off"/>
    <button onClick={handleSubmit}>Add Task</button>
    </>
  );
};

export default App;



/*

  Code line 50: Function handleEditSave()  => Breif Explaination

tasks.map: This line creates a new array by iterating over each item in the tasks array. For each task, it checks if its index is equal to taskIndex.

index === taskIndex ? {...tasks, title: editTask} : task:

This is a ternary operator used to decide what to do with each task.
index === taskIndex: This checks if the current task is the one being edited (i.e., the task whose index matches taskIndex).


Expression If True: {...task, title: editTask}

{...task}: This uses the spread operator to create a new object that includes all properties of the current task.
title: editTask: This updates or sets the title property of the new object to the value of editText (which is the new title entered by the user).
So, if index is equal to editTask, it means this is the task being edited, and the title of this task will be updated to the new value provided by the user.

Expression If False: task

If index is not equal to taskIndex, the task remains unchanged and is included as-is in the new array.


*/