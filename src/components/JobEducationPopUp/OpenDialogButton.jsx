import React, { useEffect,useState } from "react";
import { Button } from '@mui/material';
import { styled } from "@mui/material/styles";
import '../JobEducationPopUp/index.css';

const OpenDialogButtonStyled = styled("div")`
    text-align: center;
`;

const OpenDialogButton = ({ setOpenPopUp, barStatus }) => {
    const [isEnable, setIsEnable] = useState(false);

    useEffect(() => {
        if (barStatus === 1 || barStatus === 2) {
            setIsEnable(true);
        }
        else {
            setIsEnable(false);
        }
    }, [barStatus])

    const handleClickOpen = () => {
        setOpenPopUp(true);
    };

    return (
        <>
            {isEnable &&
                <OpenDialogButtonStyled>
                    <Button onClick={handleClickOpen} className="popup-buuton">{barStatus === 1 ? "Add Education Item" : "Add Job Item"}</Button>
                </OpenDialogButtonStyled>
            }
        </>)

};

export default OpenDialogButton;