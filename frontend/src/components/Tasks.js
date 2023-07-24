import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

const Tasks = () => {
  const [task, setTask] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/tasks/");
      console.log("res", res)
      setTask(res.data.tasks);
    } catch (error) {
      console.error("Error retrieving data", error);
    }
  };
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { task && task.map((row) => (
            <TableRow>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.dueDate}</TableCell>
              <TableCell>{row.taskStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Tasks;