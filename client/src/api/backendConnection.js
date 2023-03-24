import axios from 'axios';

export const validateUserRequest = async (fields) => await axios.post("http://localhost:4000/login", fields);

export const userValidateRequest = async (user, token) => await axios.post("http://localhost:4000/probando", user, {
    headers: {
        'authorization': token
    }
})