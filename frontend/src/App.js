import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import TaskDetail from "./components/TaskDetails";
import UserTask from "./components/UserTask";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
    <header>
      <Header/>
    </header>
    <main>
        <Routes>
          { !isLoggedIn ? <Route path="/login" element={<Login />} /> :
          <>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/add" element={<AddTask />} />
          <Route path="/mytasks" element={<UserTask />} />
          <Route path="/mytasks/:id" element={<TaskDetail />} />  
          </>} 
        </Routes>
      </main>  
      </>
  );
}

export default App;
