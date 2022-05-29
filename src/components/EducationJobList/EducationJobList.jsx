import React, { useEffect, useState } from "react";
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
background: #c5356a;
border-radius: 6px 6px 0px 0px;
font-style: normal;
font-size: 25px;
line-height: 54px;
color:#FFFFFF;
text-align: center;
`;

const EducationJobList = ({ educationHistory, expirienceHistory, barStatus }) => {
    const [title, setTitle] = useState('');
    const [currentData, setCurrentData] = useState([]);
    const [isEnable, setIsEnable] = useState(false);


    useEffect(() => {
        if (barStatus === 1) {
            setTitle('Educational Summary');
            setCurrentData(educationHistory);
        }
        else if (barStatus === 2) {
            setTitle('Job Summary');
            setCurrentData(expirienceHistory);
        }

        if ((barStatus === 1 || barStatus === 2) && currentData.length > 0) {
            setIsEnable(true);
        }
        else{
            setIsEnable(false);
        }
    }, [barStatus, educationHistory, expirienceHistory, currentData])

    return (
        <>
            {isEnable &&
                <><TitleStyled>
                    {title}
                </TitleStyled><EducationJobListStyled>
                        {currentData.map((item) => (
                            <EducationJobItem firstTitle={barStatus === 1 ? 'Degree level' : 'Job Title'} firstTitleValue={barStatus === 1 ? item['Degree level'] : item['Job Title']} secondTitle={barStatus === 1 ? 'Degree field' : 'Company Name'} secondTitleValue={barStatus === 1 ? item['Degree field'] : item['Company Name']} />
                        ))}
                    </EducationJobListStyled></>
            }</>
    );
};

export default EducationJobList;