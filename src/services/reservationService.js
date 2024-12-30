import axiosInstance, { handleError } from "./axiosInstance"

export const createReservation = async (slot) => {
    try {
        const res = await axiosInstance.post(`/reservation/create`, slot)
        return res.data
    } catch (error) {
        return handleError(error, 'Slot is temporary unavailable')
    }
}

export const retrieveReservationInfo = async (sessionId) => {
    try {
        const res = await axiosInstance.get(`/user/reservation/retrieve`, {
            params: { sessionId: sessionId }
        })
        return res.data;

    } catch (error) {
        return handleError(error, 'Can not retrieve reservation information')
    }
}