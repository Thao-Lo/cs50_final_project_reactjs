import axiosInstance, { handleError } from "./axiosInstance"

export const retrieveSeatList = async (page, size) => {
    try {
        const res = await axiosInstance.get(`/admin/seats`, {
            params: {
                page: page,
                size: size
            }
        });
        return res.data;

    } catch (error) {
        return handleError(error, "React: Cannot fetch Seat list")
    }
}

export const retrieveDateList = async (page, size) => {
    try {
        const res = await axiosInstance.get(`/admin/dates`, {
            params: {
                page: page,
                size: size
            }
        });
        return res.data;

    } catch (error) {
        return handleError(error, "React: Cannot fetch Date list",)
    }
}

export const retrieveSlotList = async (page, size) => {
    try {
        const res = await axiosInstance.get(`/admin/slots`, {
            params: {
                page: page,
                size: size
            }
        });
        return res.data;

    } catch (error) {
        return handleError(error, "React: Cannot fetch Slot list")
    }
}
export const retrieveReservationList = async (page, size) => {
    try {
        const res = await axiosInstance.get(`/admin/reservations`, {
            params: {
                page: page,
                size: size
            }
        });
        return res.data;

    } catch (error) {
        return handleError(error, "React: Cannot fetch Reservation list")
    }
}

export const changeReservationStatus = async (id, status) => {
    try {
        const reservationId = Number(id);
        const res = await axiosInstance.post(`/admin/reservations/edit/${reservationId}/${status}`)
        return res.data;
    } catch (error) {
        return handleError(error, "React: Cannot change Reservation status")
    }
}
