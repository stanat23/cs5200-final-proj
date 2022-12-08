import axios from "axios";
const API_URL = "https://cs5200-final-project-server.herokuapp.com/api"
const api = axios.create({withCredentials: true})

export const updateUser = async (email, phone, firstName, lastName, date_of_birth) => {
    const response = await api.put(`${API_URL}/users/${email}`, {phone, firstName, lastName, date_of_birth})
    return response.data
}

export const getUser = async (email) => {
    const response = await api.get(`${API_URL}/users/${email}`)
    return response.data
}
