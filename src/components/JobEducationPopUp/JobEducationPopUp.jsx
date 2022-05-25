import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './index.css';

const JobEducationPopUp = ({ barStatus, setOpenPopUp, openPopUp }) => {
    const [title, setTitle] = useState('');
    const [firstFieldValue, setFirstFieldValue] = useState('');
    const [secondFieldValue, setSecondFieldValue] = useState('');
    const [thirdFieldValue, setThirdFieldValue] = useState('');
    const [startYear, setStartYear] = useState(new Date());
    const [endYear, setEndYear] = useState(new Date());

    const [firstFieldTitle, setFirstFieldTitle] = useState('');
    const [secondFieldTitle, setSecondFieldTitle] = useState('');
    const [thirdFieldTitle, setThirdFieldTitle] = useState('');
    const [fourFieldTitle, setFourFieldTitle] = useState('');
    const [fiveFieldTitle, setFiveFieldTitle] = useState('');
    const [acceptText, setAcceptText] = useState('');


    useEffect(() => {
        if (barStatus === 1) {
            setFirstFieldTitle('Degree level');
            setSecondFieldTitle('Degree field');
            setThirdFieldTitle('instutation');
            setFourFieldTitle('Start Year');
            setFiveFieldTitle('Graduation Year');
            setTitle('Collage Level Education');
            setAcceptText("I've inserted my education");
        }
        else if (barStatus === 2) {
            setFirstFieldTitle('Job Title');
            setSecondFieldTitle('Company Name');
            setThirdFieldTitle('');
            setFourFieldTitle('Start Year & Month');
            setFiveFieldTitle('End Year & Month');
            setTitle('Collage Level Education');
            setAcceptText("I've inserted all my education history");
        }
    }, [barStatus])


    const handleClose = () => {
        setOpenPopUp(false);
    };

    return (
        <>
            <Dialog open={openPopUp} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={firstFieldTitle}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={firstFieldValue}
                        onChange={(e) => {
                            setFirstFieldValue(e.target.value);
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label={secondFieldTitle}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={secondFieldValue}
                        onChange={(e) => {
                            setSecondFieldValue(e.target.value);
                        }}
                    />
                    {thirdFieldTitle &&
                        <TextField
                            autoFocus
                            margin="dense"
                            label={thirdFieldTitle}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={thirdFieldValue}
                            onChange={(e) => {
                                setThirdFieldValue(e.target.value);
                            }}
                        />
                    }
                </DialogContent>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={ barStatus === 2 ? ['year','month'] : ['year'] }
                            label={fourFieldTitle}
                            value={startYear}
                            onChange={(newValue) => {
                                setStartYear(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            views={ barStatus === 2 ? ['year','month'] : ['year']}
                            label={fiveFieldTitle}
                            value={endYear}
                            onChange={(newValue) => {
                                setEndYear(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} helperText={null} />}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button className="accept-buuton" onClick={handleClose}>{acceptText}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default JobEducationPopUp;