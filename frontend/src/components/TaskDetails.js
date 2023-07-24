import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import {Box, TextField, Button, InputLabel, Typography} from "@mui/material";

const TaskDetail = () => {
  const navigate = useNavigate();
  const[task, setTask] = useState();
  const id = useParams().id;
  const [inputs, setInputs] = useState({
    title:"",
    description:"",
    dueDate:"",
    taskStatus:""
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5001/api/tasks/${id}`).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(()=>{
    fetchDetails().then((data) => {
      setTask(data.task);
      setInputs({
        title:data.task.title,
        description:data.task.description,
        dueDate:data.task.dueDate,
        taskStatus:data.task.taskStatus
      });
    });
    },[id]);

  const sendRequest = async () => {
    const res = axios.put(`http://localhost:5001/api/tasks/update/${id}`, {
      title : inputs.title,
      description : inputs.description,
      dueDate:inputs.dueDate,
      taskStatus:inputs.taskStatus
    }).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
    
  const handleSubmit=(e) => {
    e.preventDefault();
    sendRequest().then(data => console.log(data)).then(navigate("/")).then(navigate('/tasks/'));
  };

return(
  <div>
    <form onSubmit={handleSubmit}>
      <Box border={2} 
      borderColor="#D3D3D3"
      borderRadius={10} 
      boxShadow="10px 10px 10px #ccc"
      padding={3} 
      margin={"auto"} 
      marginTop={3} 
      display='flex' 
      flexDirection={"column"} width={"80%"}>
        <Typography variant="h4" fontWeight={'bold'} padding={2} color="grey" align="center">Update Your Task</Typography>
        <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Title</InputLabel>
        <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant="outlined"/>
        <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Description</InputLabel>
        <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal" variant="outlined"/>
        <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Due Date</InputLabel>
        <TextField name="dueDate" value={inputs.dueDate} type="date" onChange={handleChange} margin="normal" variant="outlined"/>
        <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Status</InputLabel>
        <TextField name="taskStatus" value={inputs.taskStatus} onChange={handleChange} margin="normal" variant="outlined"/>
        <Button type="submit" variant="contained" color="warning" sx={{mt:2, bordereRadius:4}}> Update Task</Button>
      </Box>
    </form>
  </div>
)
}

export default TaskDetail;