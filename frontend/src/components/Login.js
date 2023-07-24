import { Button, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginActions } from "../store";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isSignUp, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios.post(`http://localhost:5001/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err => console.log(err))
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      sendRequest("signup")
      .then((data) => {
        localStorage.setItem("userId",data.user._id);
        localStorage.setItem("uname", data.user.name);
      })
      .then(() => dispatch(loginActions.login())).then(() => navigate("/tasks"));
      } else {
          sendRequest()
          .then((data) => {
          localStorage.setItem("uname", data.user.name);
          localStorage.setItem("userId",data.user._id);  
        })
      .then(() => dispatch(loginActions.login())).then(() => navigate("/tasks"));
    }
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Box maxWidth={400}
            display={"flex"} flexDirection={"column"} alignItems="center" justifyContent={"center"}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={5}
            borderRadius={5}>
              <Typography variant="h2" padding={3} textAlign="center">{isSignUp ? "Signup" : "Login"}</Typography>
              {isSignUp && <TextField onChange={handleChange} name="name" margin="normal" placeholder="Name" value={inputs.name} />}
              <TextField onChange={handleChange} name="email" margin="normal" placeholder="Email" type={"email"} value={inputs.email} />
              <TextField onChange={handleChange} name="password" margin="normal" placeholder="Password" type={"password"} value={inputs.password} />
              <Button color="warning" variant="contained" type="submit"> Submit</Button>
              <Button onClick={() => setIsSignup(!isSignUp)}>Change to {isSignUp ? "Login" : "Signup"}</Button>    
          </Box>
        </form>
    </div>
    )
}

export default Login;