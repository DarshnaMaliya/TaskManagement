import express from "express";
import mongoose from "mongoose";
import router1 from "./routes/taskRoutes.js";
import router from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user", router);
app.use("/api/tasks", router1);

mongoose.connect("mongodb+srv://Darshna:399ixQwgeVLUAr95@darshna-cluster-1.0qbhmgk.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("Connected to Database"))

app.listen(5001, () => {
    console.log("Server running on port 5001");
})