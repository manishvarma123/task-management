import express from 'express';
import verifyJWT from '../middlewares/auth.middleware.js';
import createNewTask from '../controllers/tasks/createNewTask.controller.js';
import getAllTask from '../controllers/tasks/getAllTask.controller.js';
import getTaskDetails from '../controllers/tasks/getTaskDetails.controller.js';
import changeTaskStatus from '../controllers/tasks/changeTaskStatus.controller.js';
import deleteTaskGroup from '../controllers/tasks/deleteTaskGroup.controller.js';
import deleteTask from '../controllers/tasks/deleteTask.controller.js';
import getPendingTask from '../controllers/tasks/getPendingTask.controller.js';
import getCompletedTask from '../controllers/tasks/getCompletedTask.controller.js';
import updateTask from '../controllers/tasks/updateTask.controller.js';
import upload from '../middlewares/multer.js';
import uploadImage from '../controllers/tasks/uploadImage.controller.js';
import getAllEmployeeTask from '../controllers/tasks/getAllEmployeeTask.controller.js';

const router = express.Router();

router.post('/upload-image',verifyJWT,upload.single('taskImg'),uploadImage)
router.post('/create-task',verifyJWT, createNewTask);
router.get('/all-tasks',verifyJWT,getAllTask);
router.get('/employee-tasks/:id',verifyJWT,getAllEmployeeTask)
router.get('/task-details/:id',verifyJWT,getTaskDetails);
router.post('/change-status',verifyJWT,changeTaskStatus);
router.get('/delete-taskGroup/:id',verifyJWT,deleteTaskGroup)
router.delete('/delete-task/:id',verifyJWT,deleteTask)
router.get('/pending-tasks',verifyJWT,getPendingTask)
router.get('/completed-tasks',verifyJWT,getCompletedTask)
router.put('/updated-task/:id',verifyJWT,updateTask)


export default router