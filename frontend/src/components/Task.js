import { useEffect } from "react";
import { Typography, Card, CardContent, CardHeader, Avatar, IconButton, Box } from "@mui/material";
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Task = ({ title, description, dueDate, taskStatus, user, isUser, id, task }) => {
const navigate = useNavigate();
console.log("Id id", id);
const userId = localStorage.getItem("userId");
const user1 = localStorage.getItem("uname");

const sendRequest = async () => {
  const res = await axios.get(`http://localhost:5001/api/tasks/${id}`)
  .catch(err => console.log(err));
  const data = await res.data;
  return data;
}

useEffect(()=>{
  sendRequest();
}, [user1, userId, id]);

const handleEdit =() => {
  navigate(`/mytasks/${id}`);
}

const deleteRequest = async () => {
  const res = await axios.delete(`http://localhost:5001/api/tasks/delete/${id}`).catch(err=>console.log(err));
  const data = await res.data;
  return data;
}

const handleDelete = () => {
  deleteRequest().then(alert("Deleted Succesfully"));
}

return <div>
  {" "}
  <Card sx={{ width: "40%" , margin:'auto', mt:2, padding:2, boxShadow:"5px 5px 10px #ccc",}}>
  {isUser && (
    <Box display='flex'>
      <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}} color="warning"> <BorderColorTwoToneIcon/></IconButton>
      <IconButton onClick={handleDelete} color="error"> <DeleteOutlineTwoToneIcon/></IconButton>
    </Box>
  )}
  <CardHeader avatar={
    <Avatar sx={{ bgcolor: "red" }} aria-label="task">
      {user.charAt(0)}
    </Avatar>
    }
    title={title}
  />
  <hr />
  <CardContent>        
    <Typography variant="body2" color="text.secondary">
      {description} 
      <br />
      Task Due On: {dueDate} <br />
      Status: {taskStatus}
    </Typography>
  </CardContent>
</Card>
</div>
}

export default Task;