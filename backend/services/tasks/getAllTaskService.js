import mongoose from "mongoose";
import { TaskGroup } from "../../models/taskGroup.model.js"


const getAllTaskService = async (authorId) => {

    // const tasks = await TaskGroup.find({ author: authorId })
    //     .sort({ createdAt: -1 })
    //     .populate({
    //         path: "tasks",
    //         select: "_id taskTitle status taskImg"
    //     })

    const authorIdObjectId = new mongoose.Types.ObjectId(authorId);

    const tasks = await TaskGroup.aggregate([
        {$match : {author : authorIdObjectId}},
        {$sort : {createdAt : -1}},
        {$lookup : {
            from : "tasks",
            localField : "_id",
            foreignField : "groupId",
            as : "tasks"
        }},
        {$project : {
            taskGroupTitle: 1,
            "tasks._id" : 1,
            "tasks.taskTitle" : 1,
            "tasks.status" : 1,
            "tasks.taskImg" : 1
        }}
    ])
    

    return {tasks}
}

export { getAllTaskService }