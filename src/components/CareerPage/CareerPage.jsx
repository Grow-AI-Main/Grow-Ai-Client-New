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
import { analyze } from "../../services/backendService";


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 136deg, #11999e 0%, #3dabad 50%, #40514e 100%)"
        }
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 136deg, #11999e 0%, #3dabad 50%, #40514e 100%)"
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
            "linear-gradient( 136deg, rgb(61 168 170) 0%, #324b4b 50%, rgb(54 168 171) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    }),
    ...(ownerState.completed && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(61 168 170) 0%, #324b4b 50%, rgb(54 168 171) 100%)"
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
            "linear-gradient( 136deg, #e5e5e5 0%, #3d9fa0 50%, #324b4b 100%)",
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




const CareerPage = ({ barStatus, experienceHistory, educationHistory, targetJob,recomendedEducationSetter }) => {
    const [isEnable, setIsEnable] = useState(false);
    const [accomplishedJobNum, setAccomplishedJobNum] = useState(0);
    const [accomplishedEducationNum, setAccomplishedEducationNum] = useState(0);
    const [educations, setEducations] = useState([]);
    const [accomplishedJob, setAccomplishedJob] = useState([]);
    const [isEducationCompleted, setIsEducationCompleted] = useState(false);
    const [isExperienceCompleted, setIsExperienceCompleted] = useState(false);



    useEffect(() => {

        const fetchData = async (req) => {
            const returnJson = await analyze(req);
            const validData = validateData(returnJson);

            setEducation(validData)
            setJobs(validData);
        }

        if (barStatus === 3) {
            setIsEnable(true);
            const req = MakeRequest();
            fetchData(req);
        }
        else {
            setIsEnable(false);
        }
    }, [barStatus, experienceHistory, educationHistory, targetJob])


    const getUpdatedEducation = (education, firstEducationRecomended, secondEducationRecomended) => {
        if (Object.keys(firstEducationRecomended).length !== 0 && Object.keys(secondEducationRecomended).length !== 0) {
            education.push(firstEducationRecomended);
            education.push(secondEducationRecomended);
            
            if(firstEducationRecomended.hasOwnProperty('type')){
                recomendedEducationSetter(firstEducationRecomended.type);
            }
        }
        else if (Object.keys(firstEducationRecomended).length === 0 && Object.keys(secondEducationRecomended).length !== 0) {
            education.push(secondEducationRecomended);
            
            if(secondEducationRecomended.hasOwnProperty('type')){
                recomendedEducationSetter(secondEducationRecomended.type);
            }
        }
        return education;
    }

    const validateData = (returnJson) => {
        const validData = returnJson.experiences.filter((experience) => experience.jobTitle !== '');
        returnJson.experiences = validData;
        return returnJson;
    };

    const calculateDuration = (start, end) => {
        let numMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
        if (numMonths === 0 && end.getFullYear() === start.getFullYear())
            numMonths = 6
        return numMonths
    }

    const MakeRequest = () => {
        let job = [...experienceHistory]
        let edu = [...educationHistory]
        let req = {}
        req.experiences = []

        job.forEach((job) =>
            req.experiences.push({ 'jobTitle': job['jobTitle'], 'duration': calculateDuration(job['Start Year & Month'], job['End Year & Month']) })
        )

        edu.forEach((edu, index) => {
            if (index === 0) { req.firstDegree = { 'type': edu['type'], 'field': edu['field'], 'institutionName': edu['institutionName'] } }
            if (index === 1) { req.secondDegree = { 'type': edu['type'], 'field': edu['field'], 'institutionName': edu['institutionName'] } }
        })

        req.destination_job = targetJob
        return req

    }
    const setEducation = (returnJson) => {
        const firstDegree = returnJson.firstDegreeRecommendation;
        const secondDegree = returnJson.secondDegreeRecommendation;
        let currentEducations = [...educationHistory];

        currentEducations = getUpdatedEducation(currentEducations, firstDegree, secondDegree);

        setEducations(currentEducations);
        const position = educationHistory.length -1 ;
        setAccomplishedEducationNum(position);

        const currentPosition = position +1;
        
        if (currentPosition === currentEducations.length) {
            setIsEducationCompleted(true);
        }
    }

    const setJobs = (returnJson) => {
        const RecomendedExperiences = returnJson.experiences;
        
        if(RecomendedExperiences.length >= 3){
            RecomendedExperiences.pop();
        }

        const jobs = experienceHistory.concat(RecomendedExperiences);        
        const position = experienceHistory.length - 1;
        setAccomplishedJobNum(position);
        setAccomplishedJob(jobs);

        const currentPosition = position + 1;

        if (currentPosition === jobs.length) {
            setIsExperienceCompleted(true);
        }
    }

    const presentEducation = () =>
    {
        let education = []

        educations.map((label) => {
            const edu = label
            if(edu.hasOwnProperty('field')){
                education.push(
                    <Step key={edu['field']}>
                        <StepLabel StepIconComponent={ColorlibEducationStepIcon}>
                            {<>{edu['type'] + " " + edu['field']}<br />{Array.isArray(edu["institutionName"]) ? 
                            <><ul>{edu['institutionName'].map((inst) => (<h4>{inst}</h4>))}</ul></>:edu['institutionName']}</>}
                        </StepLabel>
                    </Step>
                )
            }
            else{
                education.push(
                    <Step key={edu['type']}>
                        <StepLabel StepIconComponent={ColorlibEducationStepIcon}>
                        {<>{edu['type']}<br />{Array.isArray(edu['institutionName'])? 
                            <ul>{edu['institutionName'].map((inst) => (<h4>{inst}</h4>))}</ul>:edu['institutionName']}</>}
                        </StepLabel>
                    </Step>
                )
            }
        })
        return education
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
                                <Step key={label['jobTitle'] + index}>
                                    <StepLabel StepIconComponent={ColorlibJobStepIcon}>
                                        {label['jobTitle']}<br />{label['duration'] ? "~ " + (label['duration']/12).toFixed(1) + " yr." : label['companyName']}
                                    </StepLabel>
                                </Step>
                            ))}
                            <Step completed={isExperienceCompleted}>
                                <StepLabel StepIconComponent={ColorlibJobStepIcon}>{targetJob}</StepLabel>
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
                            {presentEducation()}
                        </Stepper>
                    </div>
                </>
            } </>
    );
};

export default CareerPage;