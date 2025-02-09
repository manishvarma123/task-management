import axios from 'axios';
import { backend_domain } from '../constant';

const user = JSON.parse(localStorage.getItem('user'))

const taskAPI = axios.create({
    baseURL: backend_domain,
    withCredentials: true,
    headers: {
        'userId': user?._id,
    }
})


const userAPI = axios.create({
    baseURL: backend_domain,
    withCredentials: true,
})


export { taskAPI, userAPI }