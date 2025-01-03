import mongoose from 'mongoose';

const taskGroupSchema = new mongoose.Schema({
    taskGroupTitle: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
        }
    ]
}, { timestamps: true })

export const TaskGroup = mongoose.model("TaskGroup", taskGroupSchema)