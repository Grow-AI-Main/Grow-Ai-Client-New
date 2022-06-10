import React from "react";
import { styled } from "@mui/material/styles";

const PositionStyled = styled("button")`
width: 215px;
height: 60px;
border-radius: 70px;
background: white;
color: #43655A;
font-size: larger;
font-family: inherit;
`;

const Position = ({ isDisabled, text, setCurrentPosition, setNextStep }) => {
    return (
        <>
            <PositionStyled disabled={isDisabled} onClick={(e) => {
                setCurrentPosition(text);
                setNextStep();
            }}>
                {text}
            </PositionStyled>
        </>
    )
};

export default Position;