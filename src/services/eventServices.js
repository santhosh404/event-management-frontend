import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";
export const addEventService = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/event/create-event`, payload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('USER_AUTH_TOKEN')}`,

            },
        });
        if (response) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
}

export const getAllEventsService = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/event/get-event`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('USER_AUTH_TOKEN')}`,
            },
        });
        if (response) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
}

export const getEventByIdService = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/event/get-event/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('USER_AUTH_TOKEN')}`,
            },
        });
        if (response) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
}