import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";

const UserTask = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:5001/api/tasks/user/${id}`).catch(err=>console.log(err));
    console.log("response:", res);
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user))
  }, [])
  
    return (
      <div>
        {" "}
        {user && user.tasks && user.tasks.map((task, index) => (
        <Task
        id={task._id}
        key={index} 
        isUser ={true}
        title={task.title} 
        description={task.description}
        dueDate={task.dueDate}
        taskStatus={task.taskStatus} 
        user={user.name}/>
        ))}     
      </div>
    );
};

export default UserTask;