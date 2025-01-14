import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';


const options = ["ADMIN", "GUEST"];

function EditUserRoleDialog({ onClose, value: valueProp, open, handleSubmitRoleChange }) {
    const [value, setValue] = useState(valueProp);
    const radioGroupRef = useRef(valueProp);

    // useEffect(() => {
    //     if (!open) {
    //         setValue(valueProp);
    //     }
    // }, [valueProp, open]);


    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        if(value !== valueProp){
            handleSubmitRoleChange(value);           
            onClose();
        }else{
            onClose();
        }               
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
        >
            <DialogTitle>Current Role: {valueProp}</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label="ringtone"
                    name="ringtone"
                    value={value}
                    onChange={handleChange}
                >
                    {options.map((option) => (
                        <FormControlLabel
                            value={option}
                            key={option}
                            control={<Radio />}
                            label={option}
                        />
                    ))}
                </RadioGroup>             
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

EditUserRoleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
};

export default EditUserRoleDialog;