import React, { useState }  from "react";
import {AppBar, Button, Toolbar, Typography, Box, Tabs , Tab} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store";

const Header = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState();
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    return <AppBar sx={{background:"grey"}} position="sticky">
          <Toolbar>
          <Typography variant="h4">
              Task Manager
          </Typography>
           { isLoggedIn && <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
                <Tabs textColor="inherit" value={value} onChange={(e,val)=> setValue(val)}>
                    <Tab LinkComponent={Link} to ="/tasks" label="All Tasks"></Tab>
                    <Tab LinkComponent={Link} to = "/mytasks" label="My Tasks"></Tab>
                    <Tab LinkComponent={Link} to = "/tasks/add" label="Add Task"></Tab>
                </Tabs>
            </Box>}
            <Box display={"flex"} marginLeft={"auto"}>
                { !isLoggedIn && <>
                <Button LinkComponent={Link} to="/login" 
                variant="contained" 
                sx={{margin:1, borderRadius:10}} 
                color="warning">Login</Button>
                <Button LinkComponent={Link} to="/login" 
                variant="contained" 
                sx={{margin:1, borderRadius:10}} 
                color="warning">Sign-up</Button>
                </>
                }
               { isLoggedIn && <Button 
               onClick={()=> dispatch(loginActions.logout())}
               LinkComponent={Link} to="/login" 
               variant="contained"
                sx={{margin:1, borderRadius:10}}
                 color="warning">Logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>
};

export default Header;