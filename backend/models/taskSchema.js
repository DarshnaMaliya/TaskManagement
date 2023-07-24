import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taskStatus: {
      type: String,
      required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "TaskUser",
        required : true
    }
});

export default mongoose.model("Task", taskSchema);