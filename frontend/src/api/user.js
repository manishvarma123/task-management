import {taskAPI,userAPI} from "./api.js";

const register = "register";
const login = "login";
const logout = "logout";
const getAllUser = "get-all-user";

const USER = (route) => {
    return `api/v1/user/${route}`;
};

export default {
    registerUser(payload){
        return userAPI.post(USER(register), payload)
    },
    loginUser(payload){
        return userAPI.post(USER(login), payload)
    },
    logoutUser(){
        return userAPI.get(USER(logout))
    },
    getAllUser(){
        return taskAPI.get(USER(getAllUser))
    }
}