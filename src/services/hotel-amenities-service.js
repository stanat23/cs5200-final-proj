import axios from "axios";
const SERVER_API_URL = "https://cs5200-final-project-server.herokuapp.com/api"
const api = axios.create({withCredentials: true})

export const findAmenitiesById = async (hotel_id) => {
    const response = await api.get(`${SERVER_API_URL}/amenities/${hotel_id}`)
    return response.data
}