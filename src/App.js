import React,{useState} from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import ProgressBar from './components/Stepper/ProgressBar';
import PageTitle from './components/PageTitle/PageTitle';
import PositionList from './components/PositionsList/PositionsList';
import OpenDialogButton from './components/OpenDialogButton/OpenDialogButton';
import JobEducationPopUp from './components/JobEducationPopUp/JobEducationPopUp';
import NextStageButton from './components/NextStageButton/NextStageButton';
import './App.css';
const positions = ["Full Stack Developer", "Data Scientist", "Software Team Leader", "Full Stack Developer", "Data Scientist", "Software Team Leader"];
const Education = [{ "firstTitleValue": "B.Sc", "secondTitleValue": "Computer Science" }, { "firstTitleValue": "B.Sc", "secondTitleValue": "Computer Science" }];

const App = () => {
    const [barStatus, setBarStatus] = useState(0);
    const [currentPosition, setCurrentPosition] = useState('');
    const [openPopUp, setOpenPopUp] = useState(false);

    const setNextStep = () => {
        setBarStatus(barStatus + 1);
    };

    return (
        <>
            <StyledEngineProvider injectFirst>
                <ProgressBar barStatus={barStatus}  />
                <PageTitle text={"What do you want to be when you grow up?"} />
                <PositionList positions={positions} setCurrentPosition={setCurrentPosition} setNextStep={setNextStep} />
                <JobEducationPopUp barStatus = {barStatus} setOpenPopUp={setOpenPopUp} openPopUp={openPopUp} />
                <OpenDialogButton buttonText={"Add Education"} setOpenPopUp={setOpenPopUp} barStatus={barStatus} />
                <NextStageButton barStatus = {barStatus} setNextStep={setNextStep} />
            </StyledEngineProvider>

        </>
    );
}
export default App;
