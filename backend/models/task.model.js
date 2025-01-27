import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    taskTitle: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskGroup',
    }
},{timestamps:true})

export const Task = mongoose.model("Task",taskSchema)