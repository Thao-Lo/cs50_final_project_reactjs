import axiosInstance, { handleError } from "./axiosInstance"
import dayjs from "dayjs";

export const getSlots = async (capacity, date, time) => {
    try{

        const res = await axiosInstance.get('/slots', {
            params: {
                capacity: capacity,
                date: dayjs(date).format('YYYY-MM-DD'),
                time: time
            }
        })
        
        return res.data

    }catch (error){
        return handleError(error, "No slot available.")
    }
    
}