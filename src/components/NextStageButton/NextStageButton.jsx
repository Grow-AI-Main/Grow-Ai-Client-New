import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { styled } from "@mui/material/styles";
import '../JobEducationPopUp/index.css';

const OpenDialogButtonStyled = styled("div")`
text-align: center;
border-spacing: 10px;
`;

const NextStageButton = ({ barStatus, setNextStep, setPrevStep }) => {

    const [isNextEnable, setIsNextEnable] = useState(false);
    const [isPrevEnable, setIsPrevEnable] = useState(false);

    useEffect(() => {
        if (barStatus !== 0) {
            if (barStatus < 3) {
                setIsNextEnable(true);
            }
            else {
                setIsNextEnable(false);
            }
            setIsPrevEnable(true);
        }
        else {
            setIsNextEnable(false);
            setIsPrevEnable(false);
        }

    }, [barStatus])

    const setNextStage = () => {
        setNextStep();
    };

    const setPrevStage = () => {
        setPrevStep();
    };

    return (
        <>
            <OpenDialogButtonStyled>
                {isPrevEnable &&
                    <Button onClick={setPrevStage} className="prev-buuton">Back Stage</Button>
                }
                {isNextEnable &&
                    <Button onClick={setNextStage} className="next-buuton">Next Stage !</Button>
                }
            </OpenDialogButtonStyled>
        </>)

};

export default NextStageButton;