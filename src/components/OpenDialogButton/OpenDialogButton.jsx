import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { styled } from "@mui/material/styles";
import '../JobEducationPopUp/index.css';

const OpenDialogButtonStyled = styled("div")`
text-align: center;
`;

const OpenDialogButton = ({ setOpenPopUp, barStatus, changeLinkedinPopUpState }) => {
    const [isEnable, setIsEnable] = useState(false);
    const [isLinkedinEnable, setIsLinkedinEnable] = useState(false);


    useEffect(() => {
        if (barStatus === 1 || barStatus === 2) {
            setIsEnable(true);
            setIsLinkedinEnable(true);
        }
        else {
            setIsEnable(false);
            setIsLinkedinEnable(false);
        }
    }, [barStatus])

    const handleClickOpen = () => {
        setOpenPopUp(true);
    };

    const openLinkedinPopUp = () => {
        changeLinkedinPopUpState();
    };

    return (
        <>
            {isEnable &&
                <OpenDialogButtonStyled>
                    <Button onClick={handleClickOpen} className="popup-buuton">{barStatus === 1 ? "Add Education" : "Add Experience"}</Button>
                </OpenDialogButtonStyled>
            }
            {isLinkedinEnable &&
                <OpenDialogButtonStyled>
                    <Button onClick={openLinkedinPopUp} className="linkedin-button">{"Import Data From Linkedin"}</Button>
                </OpenDialogButtonStyled>
            }
        </>)

};

export default OpenDialogButton;