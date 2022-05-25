import React from "react";
import { styled } from "@mui/material/styles";
import EducationJobItem from "../EducationJobItem/EducationJobItem";


const EducationJobListStyled = styled("div")`
width: 40%;
margin-left: 30%;
background-color: transparent;
`;

const TitleStyled = styled("div")`
width: 40%;
height: 6%;
margin-left: 30%;
margin-top: 3%;
background: #1782fd;
border-radius: 6px 6px 0px 0px;
font-style: normal;
font-size: 25px;
line-height: 54px;
color:#FFFFFF;
text-align: center;
`;

const EducationJobList = ({ title, data, firstTitle, secondTitle }) => {
    return (
        <>
            <TitleStyled>
                {title}
            </TitleStyled>
            <EducationJobListStyled>
                {data.map((item, index) => (
                    <EducationJobItem firstTitle={firstTitle} firstTitleValue={item.firstTitleValue} secondTitle={secondTitle} secondTitleValue={item.secondTitleValue} />
                ))}
            </EducationJobListStyled>
        </>
    );
};

export default EducationJobList;