import React from "react";
import { styled } from "@mui/material/styles";

const TitleStyled = styled("div")`
width: 60%;
margin-left: 20%;
margin-top: 3%;
font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 60px;
line-height: 54px;
text-align: center;
color: #1682FD;
text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const PageTitle = ({ text }) => {
    return (
        <>
            <TitleStyled>
                {text}
            </TitleStyled>
        </>
    )
};

export default PageTitle;