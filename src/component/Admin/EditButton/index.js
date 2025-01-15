import { useState } from "react";
import EditDialog from "../EditDialog";
import { Button } from "@mui/material";
import { changeUserRole } from "../../../services/adminUserService";
import { changeReservationStatus } from "../../../services/adminManagementService";

export default function EditButton({ id, value: valueProp, type, handleUpdateValueMessage, disabled }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(valueProp);

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log("role:" + valueProp);
    };
    const handleSubmitChange = async (changedValue) => {
        let result;
        if (type === 'Role') {
            result = await changeUserRole(id, changedValue);
        } else if (type === 'Status') {
            result = await changeReservationStatus(id, changedValue);
        }

        if (result.error) {
            handleUpdateValueMessage({ text: result.message, type: "error" });
            console.log("update role error: " + result.message);
            return;
        }
        handleUpdateValueMessage({ text: result.message, type: "success" });
        console.log("update role: " + result.message);
    }

    return (
        <>
            <Button variant="contained" size="small" onClick={handleClickListItem} disabled = {type === 'Status' && disabled}>
                Edit
            </Button>

            <EditDialog
                key={id}
                keepMounted
                open={open}
                type={type}
                options={type === 'Role' ? ['ADMIN', 'GUEST'] : ['BOOKED', 'CANCELLED']}
                onClose={handleClose}
                value={value}
                handleSubmitChange={handleSubmitChange}
            />
        </>
    );
}