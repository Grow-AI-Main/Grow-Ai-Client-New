import React, { useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import ProgressBar from './components/Stepper/ProgressBar';
import PageTitle from './components/PageTitle/PageTitle';
import PositionList from './components/PositionsList/PositionsList';
import OpenDialogButton from './components/OpenDialogButton/OpenDialogButton';
import JobEducationPopUp from './components/JobEducationPopUp/JobEducationPopUp';
import NextStageButton from './components/NextStageButton/NextStageButton';
import EducationJobList from './components/EducationJobList/EducationJobList';
import CareerPage from './components/CareerPage/CareerPage';
import NextStepPage from './components/NextStepPage/NextStepPage';
import LinkedinPopUp from './components/LinkedinPopUp/LinkedinPopUp';
import './App.css';


const App = () => {
    const [barStatus, setBarStatus] = useState(0);
    const [currentPosition, setCurrentPosition] = useState('');
    const [openPopUp, setOpenPopUp] = useState(false);
    const [openLinkedinPopUp, setLinkedinPopUp] = useState(false);
    const [educationHistory, setEducationHistory] = useState([]);
    const [expirienceHistory, setExpirienceHistory] = useState([]);
    const [recomendedEducation, setRecomendedEducation] = useState('');

    const setNextStep = () => {
        setBarStatus(barStatus + 1);
    };

    const changeLinkedinPopUpState = () => {
        setLinkedinPopUp(!openLinkedinPopUp);
    }

    const setPrevStep = () => {
        setBarStatus(barStatus - 1);
    };

    const addExpirience = (newExpirience) => {
        setExpirienceHistory([...expirienceHistory, newExpirience]);
    };

    const addEducation = (newEducation) => {
        setEducationHistory([...educationHistory, newEducation]);
    };

    const recomendedEducationSetter = (educationTitle) => {
        setRecomendedEducation(educationTitle);
    }

    return (
        <>
            <StyledEngineProvider injectFirst>
                <ProgressBar barStatus={barStatus} />
                <PageTitle barStatus={barStatus} text={"What do you want to be when you grow up?"} />
                <PositionList barStatus={barStatus} setCurrentPosition={setCurrentPosition} setNextStep={setNextStep} />
                <EducationJobList educationHistory={educationHistory} expirienceHistory={expirienceHistory} barStatus={barStatus} setEducationHistory ={setEducationHistory} setExpirienceHistory={setExpirienceHistory}/>
                <NextStepPage barStatus={barStatus} recomendedEducation={recomendedEducation} currentPosition={currentPosition} />
                <OpenDialogButton buttonText={"Add Education"} setOpenPopUp={setOpenPopUp} barStatus={barStatus} changeLinkedinPopUpState={changeLinkedinPopUpState} />
                <CareerPage barStatus={barStatus} experienceHistory={expirienceHistory} educationHistory={educationHistory} targetJob={currentPosition} recomendedEducationSetter={recomendedEducationSetter} />
                <NextStageButton barStatus={barStatus} setNextStep={setNextStep} setPrevStep={setPrevStep} />
                <JobEducationPopUp barStatus={barStatus} setOpenPopUp={setOpenPopUp} openPopUp={openPopUp} addExpirience={addExpirience} addEducation={addEducation} />
                <LinkedinPopUp barStatus={barStatus} openLinkedinPopUp={openLinkedinPopUp} setLinkedinPopUp={setLinkedinPopUp} setExpirienceHistory={setExpirienceHistory} addEducation={addEducation}/>
            </StyledEngineProvider>
            
        </>
    );
}
export default App;
