import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getDegreeTypes, getDegreeFields, getDegreeInstitutions, getJobTitles } from "../../services/backendService";
import { jsonPropertiesCastting } from "../../const/jsonPropertiesCastting";
import { companyNames } from "../../const/CompanyNames";
import './index.css';

const JobEducationPopUp = ({ barStatus, setOpenPopUp, openPopUp, addExpirience, addEducation }) => {
    const [title, setTitle] = useState('');


    const [firstFieldValue, setFirstFieldValue] = useState([]);
    const [secondFieldValue, setSecondFieldValue] = useState([]);
    const [thirdFieldValue, setThirdFieldValue] = useState([]);

    const [selectedFirstFieldValue, setSelectedFirstFieldValue] = useState('');
    const [selectedSecondFieldValue, setSelectedSecondFieldValue] = useState('');
    const [selectedThirdFieldValue, setSelectedThirdFieldValue] = useState('');

    const [startYear, setStartYear] = useState(new Date());
    const [endYear, setEndYear] = useState(new Date());

    const [firstFieldTitle, setFirstFieldTitle] = useState('');
    const [secondFieldTitle, setSecondFieldTitle] = useState('');
    const [thirdFieldTitle, setThirdFieldTitle] = useState('');
    const [fourFieldTitle, setFourFieldTitle] = useState('');
    const [fiveFieldTitle, setFiveFieldTitle] = useState('');
    const [acceptText, setAcceptText] = useState('');

    useEffect(() => {
        const degreeTypes = async () => {
            const data = await getDegreeTypes();
            setSecondFieldValue(data);
        }

        const degreeFields = async () => {
            const data = await getDegreeFields();
            setFirstFieldValue(data);
        }

        const degreeInstitutions = async () => {
            const data = await getDegreeInstitutions();
            setThirdFieldValue(data);
        }

        const jobTitle = async () => {
            const data = await getJobTitles();
            setFirstFieldValue(data);
        }

        const companyName = () => {
            const data = companyNames
            setSecondFieldValue(data)
        }


        if (barStatus === 1) {
            setFirstFieldTitle('Degree Field');
            setSecondFieldTitle('Degree Type');
            setThirdFieldTitle('Institution Name');
            setFourFieldTitle('Start Year');
            setFiveFieldTitle('Graduation Year');
            setTitle('Insert Education Item');
            setAcceptText("I've inserted my education");
            degreeFields();
            degreeTypes();
            degreeInstitutions();
        }
        else if (barStatus === 2) {
            setFirstFieldTitle('Job Title');
            setSecondFieldTitle('Company Name');
            setThirdFieldTitle('');
            setFourFieldTitle('Start Year & Month');
            setFiveFieldTitle('End Year & Month');
            setTitle('Insert Job Item');
            setAcceptText("I've inserted my job");
            setSelectedSecondFieldValue('')
            jobTitle();
            companyName();
        }
    }, [barStatus])


    const handleClose = () => {
        setOpenPopUp(false);
    }

    const addNewItem = () => {
        handleClose();

        let newItem = {}
        newItem[jsonPropertiesCastting[firstFieldTitle]] = selectedFirstFieldValue;
        newItem[jsonPropertiesCastting[secondFieldTitle]] = selectedSecondFieldValue;
        newItem[fourFieldTitle] = startYear;
        newItem[fiveFieldTitle] = endYear;

        if (barStatus === 1) {
            newItem[jsonPropertiesCastting[thirdFieldTitle]] = selectedThirdFieldValue;
            addEducation(newItem);
        }
        else if (barStatus === 2) {
            addExpirience(newItem);
        }
    };

    return (
        <>
            <Dialog open={openPopUp} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        disablePortal
                        className="text-fields"
                        options={firstFieldValue}
                        renderInput={(params) => <TextField {...params} label={firstFieldTitle}
                        />}
                        onChange={(event, newValue) => {
                            setSelectedFirstFieldValue(newValue);
                        }}
                    />
                    {!thirdFieldTitle &&
                        <Autocomplete
                        disablePortal
                        className="text-fields"
                        options={secondFieldValue}
                        renderInput={(params) => <TextField {...params} label={secondFieldTitle} />}
                        onChange={(event, newValue) => {
                            setSelectedSecondFieldValue(newValue);
                        }}
                    />
                    }
                    {
                        thirdFieldTitle &&
                        <Autocomplete
                            required
                            disablePortal
                            className="text-fields"
                            options={secondFieldValue}
                            renderInput={(params) => <TextField {...params} label={secondFieldTitle} />}
                            onChange={(event, newValue) => {
                                setSelectedSecondFieldValue(newValue);
                            }}
                        />
                    }
                    {thirdFieldTitle &&
                        <Autocomplete
                            required
                            disablePortal
                            className="text-fields"
                            options={thirdFieldValue}
                            defaultValue={thirdFieldValue[0]}
                            renderInput={(params) => <TextField {...params} label={thirdFieldTitle} />}
                            onChange={(event, newValue) => {
                                setSelectedThirdFieldValue(newValue);
                            }}
                        />
                    }
                </DialogContent>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={barStatus === 2 ? ['year', 'month'] : ['year']}
                            label={fourFieldTitle}
                            value={startYear}
                            onChange={(newValue) => {
                                setStartYear(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} sx={{ mr: 3 }} />}
                        />
                        <DatePicker
                            views={barStatus === 2 ? ['year', 'month'] : ['year']}
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
                    <Button className="accept-buuton" onClick={addNewItem}>{acceptText}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default JobEducationPopUp;
