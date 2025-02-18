import mongoose from "mongoose";
import { TaskGroup } from "../../models/taskGroup.model.js";

const getPendingTaskService = async (authorId) => {
  // const allTask = await TaskGroup.find({ author: authorId })
  //     .sort({ createdAt: -1 })
  //     .populate({ path: 'tasks', select: "_id taskTitle taskImg status" })

  // const pendingTask = allTask?.filter((taskGroup) => {
  //     return (
  //         taskGroup?.tasks?.some((task) => task?.status === "pending")
  //     )
  // })

  const authorIdObjectId = new mongoose.Types.ObjectId(authorId);

  const pendingTask = await TaskGroup.aggregate([
    { $match: { author: authorIdObjectId } },
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "groupId",
        as: "tasks",
      },
    },
    {
      $match: {
        $expr: {
          $gt: [
            {
              $size: {
                $filter: {
                  input: "$tasks",
                  as: "task",
                  cond: { $eq: ["$$task.status", "pending"] },
                },
              },
            },
            0,
          ],
        },
      },
    },
    {
      $project: {
        taskGroupTitle: 1,
        "tasks._id": 1,
        "tasks.taskTitle": 1,
        "tasks.status": 1,
        "tasks.taskImg": 1,
      },
    },
  ]);

  if (pendingTask?.length === 0) {
    return {
      message: "No Pending Task found",
      data: [],
    };
  }

  return {
    message: "Pending task group fetch successfully",
    data: pendingTask,
  };
};

export { getPendingTaskService };
