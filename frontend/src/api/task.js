import {taskAPI} from "./api.js";


const uploadImage = "upload-image";
const createTask = "create-task";
const allTasks = "all-tasks";
const allEmployeeTask = "employee-tasks";
const taskDetails = "task-details";
const changeTaskStatus = "change-status";
const deleteTaskGroup = "delete-taskGroup";
const deleteTask = "delete-task";
const pendingTask = "pending-tasks";
const completedTask = "completed-tasks";
const updatedTask = "updated-task"

const TASKS = (route, params = '') => {
    return `api/v1/task/${route}${params ? `/${params}` : ''}`;
};


export default {
    
    uploadImage(formData) {
        return taskAPI.post(TASKS(uploadImage), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    createTask(payload) {
        return taskAPI.post(TASKS(createTask), payload);
    },
    getAllTasks() {
        return taskAPI.get(TASKS(allTasks));
    },
    getEmployeeTasks(id) {
        return taskAPI.get(TASKS(allEmployeeTask, id));
    },
    getTaskDetails(id) {
        return taskAPI.get(TASKS(taskDetails, id));
    },
    changeTaskStatus(payload) {
        return taskAPI.post(TASKS(changeTaskStatus), payload);
    },
    deleteTaskGroup(id) {
        return taskAPI.get(TASKS(deleteTaskGroup, id));
    },
    deleteTask(id) {
        return taskAPI.delete(TASKS(deleteTask, id));
    },
    getPendingTasks() {
        return taskAPI.get(TASKS(pendingTask));
    },
    getCompletedTasks() {
        return taskAPI.get(TASKS(completedTask));
    },
    updateTask(id, payload) {
        return taskAPI.put(TASKS(updatedTask, id), payload);
    }
};