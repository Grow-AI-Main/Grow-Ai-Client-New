import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { styled } from "@mui/material/styles";
import '../JobEducationPopUp/index.css';

const OpenDialogButtonStyled = styled("div")`
text-align: center;
border-spacing: 10px;
`;

const NextStageButton = ({ barStatus, setNextStep, setPrevStep }) => {

    const [isEnable, setIsEnable] = useState(false);

    useEffect(() => {
        if (barStatus !== 0) {
            setIsEnable(true);
        }
        else{
            setIsEnable(false);
        }
    }, [barStatus])

    const setNextStage = () => {
        setNextStep();
    };

    const setPrevStage = () => {
        setPrevStep();
    };

    return (
        <>{isEnable &&
            <OpenDialogButtonStyled>
                <Button onClick={setPrevStage} className="prev-buuton">Back Stage</Button>
                <Button onClick={setNextStage} className="next-buuton">Next Stage !</Button>
            </OpenDialogButtonStyled>
        }
        </>)

};

export default NextStageButton;