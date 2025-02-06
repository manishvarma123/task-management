import { createSlice } from "@reduxjs/toolkit";


const taskSlice = createSlice({
    name : "task",
    initialState : {
        task : 'all',
        allTasks : [],
        taskDetails : {},
        pendingTasks : [],
        completedTasks : [],
        openUpdateTask : false,
        selectedTask : {}
    },
    reducers : {
        // actions
        setTask : (state,action) => {
            state.task = action.payload
        },
        setAllTasks : (state,action) => {
            state.allTasks = action.payload
        },
        setTaskDetails : (state,action) => {
            state.taskDetails = action.payload
        },
        setPendingTasks : (state,action) => {
            state.pendingTasks = action.payload
        },
        setCompletedTasks : (state,action) => {
            state.completedTasks = action.payload
        },
        setOpenUpdateTask : (state,action) => {
            state.openUpdateTask = action.payload
        },
        setSelectedTask : (state,action) => {
            state.selectedTask = action.payload
        }
    }
})

export const {setTask,setAllTasks,setTaskDetails,setPendingTasks,setCompletedTasks,setOpenUpdateTask,setSelectedTask} = taskSlice.actions;

export default taskSlice.reducer;