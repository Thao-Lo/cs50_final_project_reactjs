import { useState } from "react";
import EditUserRoleDialog from "../EditUserRoleDialog";
import { Button } from "@mui/material";
import { changeUserRole } from "../../../services/adminUserService";

export default function EditUserRoleButton({ id, value: valueProp, handleUpdateValueMessage }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(valueProp);

   
    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
        console.log("role:" + valueProp);
    };
    const handleSubmitRoleChange = async (changedValue) => {
        const result = await changeUserRole(id, changedValue);
        if (result.error) {
            console.log("update role error: " + result.message);
            return;
        }
        handleUpdateValueMessage(result.message);
        console.log("update role: " + result.message);
    }
     
    return (
        <>
            <Button variant="contained" size="small" onClick={handleClickListItem}>
                Edit
            </Button>

            <EditUserRoleDialog
                key={id}
                keepMounted
                open={open}
                onClose={handleClose}
                value={value}
                handleSubmitRoleChange={handleSubmitRoleChange}
            />
        </>
    );
}