import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import SnackBarNotify from "./SnackBarNotify";
import { getProfileData } from "../../services/backendService";


const LinkedinPopUp = ({ barStatus, setLinkedinPopUp, openLinkedinPopUp, setExpirienceHistory, addEducation }) => {
    const mainTitle = 'Do You want to take your data from Linkedin ?';
    const subTitle = '* This is a Beta Feature ';
    const inputTitle = 'Enter Your Linkedin Id:';
    const acceptText = 'Accept';
    const cancelText = 'Decline';
    const betaUsers = ['gal-tandeitnik', 'tom-pony'];
    const [currentUser, setCurrentUser] = useState('');
    const [notifyStatus, setNotifyStatus] = useState(false);

    useEffect(() => {
        if (barStatus === 1) {
            setLinkedinPopUp(true);
        }
    }, [barStatus])

    const handleClose = () => {
        setLinkedinPopUp(false);
    }

    const parseData = (data) => {

        if (data.hasOwnProperty('firstDegree')) {
            addEducation({
                field: data.firstDegree.field,
                instutationName: data.firstDegree.institutionName,
                type: data.firstDegree.type
            });
        }

        if (data.hasOwnProperty('secondDegree')) {
            addEducation({
                field: data.secondDegree.field,
                instutationName: data.secondDegree.institutionName,
                type: data.secondDegree.type
            });
        }

        const linkedinExperiences = [];

        data.experiences.forEach(experience => {
            linkedinExperiences.push({
                companyName: experience.companyName,
                jobTitle: experience.jobTitle,
                'End Year & Month': new Date(experience.startDate.year, 1, 1),
                'Start Year & Month': new Date(experience.endDate.year, 1, 1)
            });
        });

        setExpirienceHistory([...linkedinExperiences])
    }

    const getUserData = async () => {
        if (betaUsers.includes(currentUser)) {
            let data = await getProfileData(currentUser);
            parseData(data);
            handleClose();
        }
        else {
            handleClose();
            setNotifyStatus(true);
        }
    }

    return (
        <>
            <Dialog open={openLinkedinPopUp} onClose={handleClose}>
                <DialogTitle>{mainTitle}</DialogTitle>
                <DialogContent>
                    <DialogTitle>{subTitle}</DialogTitle>
                    <TextField
                        autoFocus
                        className="text-fields"
                        margin="dense"
                        label={inputTitle}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={currentUser}
                        onChange={(e) => {
                            setCurrentUser(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className="decline-button" onClick={handleClose}>{cancelText}</Button>
                    <Button className="accept-buuton" onClick={getUserData}>{acceptText}</Button>
                </DialogActions>
            </Dialog>
            {notifyStatus &&
                <SnackBarNotify notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />
            }
        </>
    )
};

export default LinkedinPopUp;