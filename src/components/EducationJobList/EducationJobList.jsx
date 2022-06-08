import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import EducationJobItem from "../EducationJobItem/EducationJobItem";


const EducationJobListStyled = styled("div")`
width: 45%;
margin-left: 26%;
background-color: transparent;
`;

const TitleStyled = styled("div")`
width: 45%;
height: 6%;
margin-left: 26%;
margin-top: 3%;
background: #c5356a;
border-radius: 6px 6px 0px 0px;
font-style: normal;
font-size: 25px;
line-height: 54px;
color:#FFFFFF;
text-align: center;
`;

const EducationJobList = ({ educationHistory, expirienceHistory, barStatus, setEducationHistory, setExpirienceHistory }) => {
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
        else {
            setIsEnable(false);
        }
    }, [barStatus, educationHistory, expirienceHistory, currentData])


    const removeEducationOrJob = (key) => {
        let updatedData = [];

        if (barStatus === 1) {
            setCurrentData(educationHistory);
            updatedData = [...educationHistory];
            updatedData.splice(key, 1);
            setEducationHistory([...updatedData]);
        }
        else if (barStatus === 2) {
            setCurrentData(expirienceHistory);
            updatedData = [...expirienceHistory];
            updatedData.splice(key, 1);
            setExpirienceHistory([...updatedData]);
        }
    }

    return (
        <>
            {isEnable &&
                <><TitleStyled>
                    {title}
                </TitleStyled><EducationJobListStyled>
                        {currentData.map((item, index) => (
                            <EducationJobItem index={index} firstTitle={barStatus === 1 ? 'Instutation Name' : 'JobTitle'} firstTitleValue={barStatus === 1 ? item['Instutation Name'] : item['JobTitle']} secondTitle={barStatus === 1 ? 'Degree field' : 'Company Name'} secondTitleValue={barStatus === 1 ? item['Degree field'] : item['Company Name']} removeEducationOrJob={removeEducationOrJob} />
                        ))}
                    </EducationJobListStyled></>
            }</>
    );
};

export default EducationJobList;