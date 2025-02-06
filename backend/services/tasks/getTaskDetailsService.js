import { TaskGroup } from "../../models/taskGroup.model.js"


const getTaskDetailsService = async (id) => {

    const data = await TaskGroup.findById(id)
        .populate({
            path: "tasks",
            select: "_id taskTitle taskImg status"
        })

    return {data}
}

export { getTaskDetailsService }