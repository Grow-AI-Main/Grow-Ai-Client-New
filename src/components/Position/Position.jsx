import React from "react";
import { styled } from "@mui/material/styles";

const PositionStyled = styled("button")`
    width: 250px;
    height: 75px;
    border-radius: 70px;
    background: transparent;
    color: #1682fd;
    font-size: larger;
    font-family: inherit;
`;

const Position = ({ text, setCurrentPosition, setNextStep }) => {
    return (
        <>
            <PositionStyled onClick={(e) => {
                setCurrentPosition(text);
                setNextStep();
            }}>
                {text}
            </PositionStyled>
        </>
    )
};

export default Position;