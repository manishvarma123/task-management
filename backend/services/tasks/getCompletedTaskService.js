import mongoose from "mongoose";
import { TaskGroup } from "../../models/taskGroup.model.js";

const getCompletedTaskService = async (authorId) => {
  //   const allTask = await TaskGroup.find({ author: authorId })
  //     .sort({ createdAt: -1 })
  //     .populate({ path: "tasks", select: "_id taskTitle taskImg status" });

  //   const completedTasks = allTask?.filter((taskGroup) => {
  //     return taskGroup?.tasks?.every((task) => task?.status === "completed");
  //   });

  const authorIdObjectId = new mongoose.Types.ObjectId(authorId);

  const completedTasks = await TaskGroup.aggregate([
    // Step 1: Match TaskGroups by authorId
    {
      $match: { author: authorIdObjectId },
    },

    // Step 2: Lookup tasks related to the TaskGroup
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "groupId",
        as: "tasks",
      },
    },

    // Step 3: Filter to include only TaskGroups where all tasks are completed
    {
      $match: {
        $expr: {
          $eq: [
            { $size: "$tasks" }, // Total number of tasks in the taskGroup
            {
              $size: {
                $filter: {
                  input: "$tasks", // The tasks array
                  as: "task", // Alias for each task
                  cond: { $eq: ["$$task.status", "completed"] }, // Only count tasks with status "completed"
                },
              },
            },
          ],
        },
      },
    },

    // Step 4: Project necessary fields (taskGroupTitle and task details)
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

  if (completedTasks?.length === 0) {
    return {
      message: "No completed Task group Found",
      data: [],
    };
  }

  return {
    message: "completed Task fetched successfully",
    data: completedTasks,
  };
};

export { getCompletedTaskService };
