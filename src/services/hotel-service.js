import axios from "axios";
const SERVER_API_URL = "https://cs5200-final-project-server.herokuapp.com/api"
const api = axios.create({withCredentials: true})

export const findAllHotels = async () => {
    const response = await api.get(`${SERVER_API_URL}/hotels`)
    return response.data
}

export const findAvailableHotels = async () => {
    const response = await api.get(`${SERVER_API_URL}/availablehotels`)
    return response.data
}

export const findHotelById = async (hid) => {
    const response = await api.get(`${SERVER_API_URL}/hotels/${hid}`)
    return response.data
}