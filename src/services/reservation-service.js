import axios from "axios";
const SERVER_API_URL = "https://cs5200-final-project-server.herokuapp.com/api"
const api = axios.create({withCredentials: true})

export const addReservation = async (room_number, room_type, hotel_id, email, check_in_date, duration_days, booking_price, special_request) => {
    const payment_status = false
    const response = await api.post(`${SERVER_API_URL}/reservations`, {room_number, room_type, hotel_id, email, check_in_date, duration_days, booking_price, special_request, payment_status})
    return response.data
}

export const findAllReservations = async () => {
    const response = await api.get(`${SERVER_API_URL}/reservations`)
    return response.data
}

export const findUserReservations = async (email) => {
    const response = await api.get(`${SERVER_API_URL}/reservations/${email}`)
    return response.data
}

export const findUnpaidUserReservations = async (email) => {
    const response = await api.get(`${SERVER_API_URL}/unpaidreservations/${email}`)
    return response.data
}

export const markReservationAsPaid = async (email) => {
    const response = await api.put(`${SERVER_API_URL}/reservations/${email}`)
    return response.data
}

export const deleteReservation = async (rid) => {
    const response = await api.delete(`${SERVER_API_URL}/reservations/${rid}`)
    return response.data
}