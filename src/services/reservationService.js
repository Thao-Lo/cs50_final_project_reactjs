import axios from "axios"
import axiosInstance, { handleError } from "./axiosInstance"

export const createReservation = async (slot) => {
    try {
        const res = await axiosInstance.post(`/reservation/create`, slot)
        return res.data
    } catch (error) {
        return handleError(error, 'Slot is temporary unavailable')
    }
}
export const deleteRedisForNonProcessingBooking = async (sessionId) => {
    try {
        const res = await axiosInstance.delete(`/reservation/delete-redis-key`, {
            params: {
                sessionId: sessionId
            }
        })
        return res.data;
    } catch (error){
        return handleError(error, "Failed to release the slot")
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

export const createPayment = async (sessionId) => {
    try {
        const res = await axiosInstance.post(`/user/reservation/create-payment`, null, {
            params: { sessionId: sessionId }
        })
        return res.data;
    } catch (error) {
        return handleError(error, 'Cannot create payment')
    }
}

//post if only params must include {} body
export const confirmReservation = async (sessionId, paymentIntentId) => {
    try {
        const res = await axiosInstance.post(`/user/reservation/confirm-reservation`, {}, {
            params: {
                sessionId: sessionId,
                paymentIntentId: paymentIntentId
            }
        })
        return res.data;
    } catch (error) {
        return handleError(error, 'Can not create payment')
    }
}

//get dont include {} body before params
export const retrieveUserReservationList = async (userId, page, size) => {
    try {
        const res = await axiosInstance.get(`/user/reservation-list`, {
            params: {
                userId: Number(userId),
                page: page,
                size: size
            }
        });
        return res.data;

    } catch (error) {
        return handleError(error, "Cannot get user reservation list")
    }
}