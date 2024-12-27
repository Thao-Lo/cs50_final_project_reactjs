import axiosInstance, { handleError } from "./axiosInstance"

export const createReservation = async (slot) => {
    try {
        const res = await axiosInstance.post(`/reservation/create`, slot)
        return res.data
    } catch (error) {
        handleError( error, 'Slot is temporary unavailable')
    }
} 