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
        return handleError(error, "React: cannot fetch user list")
    }
}

export const changeUserRole = async (id, role) => {    
    try{
        const userId = Number(id); 
        const res = await axiosInstance.post(`/admin/user/edit-role/${userId}/${role}`)
        return res.data;
    }catch (error){
        return handleError(error, "React: Cannot change role of user")
    }
}
