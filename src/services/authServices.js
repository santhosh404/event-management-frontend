import axios from "axios"


const BASE_URL = 'https://event-management-backend-r2cl.onrender.com'

export const signUpService = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/auth/sign-up`, payload);
        if (response) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
}

export const signInService = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/auth/sign-in`, payload);
        if (response) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
}