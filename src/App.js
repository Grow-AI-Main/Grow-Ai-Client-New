import React,{useState} from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import ProgressBar from './components/Stepper/ProgressBar';
import PageTitle from './components/PageTitle/PageTitle';
import PositionList from './components/PositionsList/PositionsList';
import OpenDialogButton from './components/OpenDialogButton/OpenDialogButton';
import JobEducationPopUp from './components/JobEducationPopUp/JobEducationPopUp';
import NextStageButton from './components/NextStageButton/NextStageButton';
import EducationJobList from './components/EducationJobList/EducationJobList';
import './App.css';

const App = () => {
    const [barStatus, setBarStatus] = useState(0);
    const [currentPosition, setCurrentPosition] = useState('');
    const [openPopUp, setOpenPopUp] = useState(false);
    const [educationHistory, setEducationHistory] = useState([]);
    const [expirienceHistory, setExpirienceHistory] = useState([]);

    const setNextStep = () => {
        setBarStatus(barStatus + 1);
    };

    const addExpirience = (newExpirience) => {
        setExpirienceHistory([...expirienceHistory,newExpirience]);
    };

    const addEducation = (newEducation) => {
        setEducationHistory([...educationHistory,newEducation]);
    };

    return (
        <>
            <StyledEngineProvider injectFirst>
                <ProgressBar barStatus={barStatus}  />
                <PageTitle barStatus={barStatus} text={"What do you want to be when you grow up?"} />
                <PositionList setCurrentPosition={setCurrentPosition} setNextStep={setNextStep} />
                <EducationJobList educationHistory ={educationHistory} expirienceHistory={expirienceHistory} barStatus ={barStatus} />
                <JobEducationPopUp barStatus = {barStatus} setOpenPopUp={setOpenPopUp} openPopUp={openPopUp} addExpirience={addExpirience} addEducation={addEducation} />
                <OpenDialogButton buttonText={"Add Education"} setOpenPopUp={setOpenPopUp} barStatus={barStatus} />
                <NextStageButton barStatus = {barStatus} setNextStep={setNextStep} />
            </StyledEngineProvider>

        </>
    );
}
export default App;