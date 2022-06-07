import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import StepConnector, {
    stepConnectorClasses
} from "@mui/material/StepConnector";
import './index.css';
import JsonData from '../../const/responseExample.json';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 136deg, rgb(247 244 247) 0%, rgb(0 128 255) 50%, rgb(0 128 255) 100%)"
        }
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 136deg, rgb(247 244 247) 0%, rgb(0 128 255) 50%, rgb(0 128 255) 100%)"
        }
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1
    }
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "20%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'left',
    ...(ownerState.active && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(255 133 43) 0%, #f48023 50%, rgb(22 130 253 / 65%) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    }),
    ...(ownerState.completed && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(219 131 65) 0%, #e58235 50%, rgb(228 130 54) 100%)"
    })
}));

const ColorlibMainIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 70,
    height: 70,
    display: "flex",
    borderRadius: "20%",
    justifyContent: "center",
    marginTop: '4px',
    alignItems: "center",
    ...(ownerState.active && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(0 128 255) 0%, #0080ff 50%, rgb(22 130 253 / 65%) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    }),
    ...(ownerState.completed && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(219 131 65) 0%, #e58235 50%, rgb(228 130 54) 100%)"
    })
}));

const MainJobIcon = (props) => {
    const { active, completed, className } = props;

    const icons = {
        1: <BusinessIcon sx={{ width: '2em', height: '2em' }} />,
    };

    return (
        <ColorlibMainIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </ColorlibMainIconRoot>
    );
};

const MainEducationIcon = (props) => {
    const { active, completed, className } = props;

    const icons = {
        1: <SchoolIcon sx={{ width: '2em', height: '2em' }} />,
    };

    return (
        <ColorlibMainIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </ColorlibMainIconRoot>
    );
};

const ColorlibJobStepIcon = (props) => {
    const { active, completed, className } = props;

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {(active || completed) ? <AssignmentTurnedInRoundedIcon /> : <WorkHistoryRoundedIcon />}
        </ColorlibStepIconRoot>
    );
};

const ColorlibEducationStepIcon = (props) => {
    const { active, completed, className } = props;

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {(active || completed) ? <BookmarkAddedRoundedIcon /> : <HistoryEduRoundedIcon />}
        </ColorlibStepIconRoot>
    );
};


const getUpdatedEducation = (education,firstEducationRecomended,secondEducationRecomended) => {
    if(Object.keys(firstEducationRecomended).length !== 0 && Object.keys(secondEducationRecomended).length !== 0 ) {
        education.push(firstEducationRecomended);
        education.push(secondEducationRecomended);
    }
    else if (Object.keys(firstEducationRecomended).length === 0 && Object.keys(secondEducationRecomended).length !== 0 ) {
        education.push(secondEducationRecomended);
    }
    return education;
}

const CareerPage = ({ barStatus, experienceHistory, educationHistory, targetJob }) => {
    const [isEnable, setIsEnable] = useState(false);
    const [accomplishedJobNum, setAccomplishedJobNum] = useState(0);
    const [accomplishedEducationNum, setAccomplishedEducationNum] = useState(0);
    const [educations, setEducations] = useState([]);
    const [accomplishedJob, setAccomplishedJob] = useState([]);
    const [dreamJob, setDreamJob] = useState('');
    const [isEducationCompleted, setIsEducationCompleted] = useState(false);
    const [isExperienceCompleted, setIsExperienceCompleted] = useState(false);



    useEffect(() => {
        if (barStatus === 3) {
            setIsEnable(true);
            setEducation()
            setJobs();
            const dream = targetJob;
            setDreamJob(dream);

        }
        else {
            setIsEnable(false);
        }
    }, [barStatus, experienceHistory, educationHistory, targetJob])

    const setEducation = () => {
        const firstDegree = JsonData.firstDegree;
        const secondDegree = JsonData.secondDegree;
        let currentEducations = [...educationHistory];

        currentEducations = getUpdatedEducation(currentEducations,firstDegree,secondDegree);

        setEducations(currentEducations);
        const position = educationHistory.length - 1;
        setAccomplishedEducationNum(position);

        
        if(educationHistory.length === currentEducations.length){
            setIsEducationCompleted(true);
        }
    }

    const setJobs = () => {
        const RecomendedExperiences = JsonData.experiences;
        const jobs = experienceHistory.concat(RecomendedExperiences);
        const position = experienceHistory.length - 1;
        setAccomplishedJobNum(position);
        setAccomplishedJob(jobs);
        
        const currentPosition = position + 1;
        
        if( currentPosition === jobs.length){
            setIsExperienceCompleted(true);
        }
    }

    return (
        <>
            {isEnable &&
                <>
                    <div className="stepper-main-div">
                        <Stepper alternativeLabel connector={<ColorlibConnector />}>
                            <Step>
                                <StepLabel StepIconComponent={MainJobIcon}></StepLabel>
                            </Step>
                        </Stepper>
                    </div>
                    <div className="recomended-div">
                        <Stepper alternativeLabel activeStep={accomplishedJobNum} connector={<ColorlibConnector />}>
                            {accomplishedJob.map((label, index) => (
                                <Step key={label['Job Title'] + index}>
                                    <StepLabel StepIconComponent={ColorlibJobStepIcon}>
                                        {label['Job Title']}<br />{label['duration'] ? "~ " + label['duration'] + " mo." : label['Company Name']}
                                    </StepLabel>
                                </Step>
                            ))}
                            <Step completed={isExperienceCompleted}>
                                <StepLabel StepIconComponent={ColorlibJobStepIcon}>{dreamJob}</StepLabel>
                            </Step>
                        </Stepper>
                    </div>
                    <div className="stepper-main-div">
                        <Stepper alternativeLabel connector={<ColorlibConnector />}>
                            <Step>
                                <StepLabel StepIconComponent={MainEducationIcon}></StepLabel>
                            </Step>
                        </Stepper>
                    </div>
                    <div className="recomended-div">
                        <Stepper alternativeLabel activeStep={accomplishedEducationNum} connector={<ColorlibConnector />}>
                            {educations.map((label, index) => (
                                <Step completed={isEducationCompleted} key={label['Degree field']}>
                                    <StepLabel StepIconComponent={ColorlibEducationStepIcon}>
                                        {<><>{label['Degree type'] + " " + label['Degree field']}</>
                                            <>{index > accomplishedEducationNum ? <><br /><ul>
                                                {label['institutionName'].map((inst) => (<li>{inst}</li>))}</ul></> : <>{label['Instutation Name']}</>}</></>}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                </>
            } </>
    );
};

export default CareerPage;
