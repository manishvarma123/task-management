import axios from 'axios';
import { backend_domain } from '../constant';

// Create Axios instances without the `userId` header initially
const taskAPI = axios.create({
    baseURL: backend_domain,
    withCredentials: true,
});

const userAPI = axios.create({
    baseURL: backend_domain,
    withCredentials: true,
});

// Function to dynamically add `userId` to headers before making a request
const getUserIdHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?._id ? { 'userId': user._id } : {};  // Return an empty object if user._id doesn't exist
};

taskAPI.interceptors.request.use(
    (config) => {
        // Add userId dynamically before each request
        const userIdHeader = getUserIdHeader();
        config.headers = {
            ...config.headers,
            ...userIdHeader,
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { taskAPI, userAPI };
