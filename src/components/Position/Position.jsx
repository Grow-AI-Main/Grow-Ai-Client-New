import React from "react";
import { styled } from "@mui/material/styles";

const PositionStyled = styled("button")`
width: 60%;
width: 246px;
height: 50px;
background: rgba(255, 255, 255, 0.8);
border-radius: 100px;
`;

const Position = ({ text, setCurrentPosition,setNextStep,setIsPositionsEnable }) => {
    return (
        <>
            <PositionStyled onClick={(e) => {
                setCurrentPosition(e.target.value);
                setNextStep();
                setIsPositionsEnable(false);
            }}>
                {text}
            </PositionStyled>
        </>
    )
};

export default Position;