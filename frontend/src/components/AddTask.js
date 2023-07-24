import { InputLabel, TextField, Typography , Box, Button} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title :"",
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

const handleSubmit = (e) => {
  e.preventDefault();
  sendRequest().then(data=> console.log("data is: ", data)).then(navigate("/tasks"));
};

const sendRequest = async () => {
  const res = await axios.post("http://localhost:5001/api/tasks/add", {
    title:inputs.title,
    description:inputs.description,
    dueDate:inputs.dueDate,
    taskStatus:inputs.taskStatus,
    user:localStorage.getItem("userId")
  })
  const data = await res.data;
  return data;     
}

return(
    <div>
        <form onSubmit={handleSubmit}>
        <Box border={2} borderColor="#D3D3D3" borderRadius={10} 
            boxShadow="10px 10px 10px #ccc" padding={3} margin={"auto"} marginTop={3} display='flex' 
            flexDirection={"column"} width={"80%"}>
              <Typography variant="h4" fontWeight={'bold'} padding={2} color="grey" align="center">Add Your Task</Typography>
              <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Title</InputLabel>
              <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant="outlined"/>
              <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Description</InputLabel>
              <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal" variant="outlined"/>
              <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Due Date</InputLabel>
              <TextField name="dueDate" value={inputs.dueDate} type="date" onChange={handleChange} margin="normal" variant="outlined"/>
              <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Status</InputLabel>
              <TextField name="taskStatus" value={inputs.taskStatus} onChange={handleChange} margin="normal" variant="outlined"/>
              <Button type="submit" variant="contained" color="warning" sx={{mt:2, bordereRadius:4}}> Add Task</Button>
          </Box>
          </form>
    </div>
)
}

export default AddTask;