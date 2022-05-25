import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { styled } from "@mui/material/styles";
import '../JobEducationPopUp/index.css';

const OpenDialogButtonStyled = styled("div")`
margin-top: 3%;
text-align: center;
`;

const NextStageButton = ({ barStatus, setNextStep }) => {

    const [isEnable, setIsEnable] = useState(false);

    useEffect(() => {
        if (barStatus !== 0) {
            setIsEnable(true);
        }
    }, [barStatus])

    const handleClickOpen = () => {
        setNextStep();
    };

    return (
        <>{isEnable &&
            <OpenDialogButtonStyled>
                <Button onClick={handleClickOpen} className="next-buuton">Next Stage !</Button>
            </OpenDialogButtonStyled>
        }
        </>)

};

export default NextStageButton;