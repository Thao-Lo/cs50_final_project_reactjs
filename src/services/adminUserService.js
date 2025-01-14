import axiosInstance, { handleError } from "./axiosInstance"

export const retrieveUserList = async (page, size) => {
    try {
        const res = await axiosInstance.get(`/admin/user/list`, {
            params: {
                pageable: true, 
                page: page,
                size: size
            }
        })
        return res.data;

    } catch (error) {
        return handleError(error, "React cannot fetch user list")
    }
}

