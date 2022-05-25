import React, { useEffect,useState } from "react";
import { Button } from '@mui/material';
import { styled } from "@mui/material/styles";
import '../JobEducationPopUp/index.css';

const OpenDialogButtonStyled = styled("div")`
margin-top: 3%;
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
                    <Button onClick={handleClickOpen} className="accept-buuton">{barStatus === 1 ? "Add Education" : "Add Expeirience"}</Button>
                </OpenDialogButtonStyled>
            }
        </>)

};

export default OpenDialogButton;