import React, { useEffect,useState } from "react";
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
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
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
    textAlign:'left',
    ...(ownerState.active && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(255 133 43) 0%, #f48023 50%, rgb(22 130 253 / 65%) 100%);",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    }),
    ...(ownerState.completed && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(255 133 43) 50%, #f48023 50%, rgb(22 130 253 / 65%) 100%);"
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
            "linear-gradient( 136deg, rgb(0 128 255) 0%, #0080ff 50%, rgb(22 130 253 / 65%) 100%);",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    }),
    ...(ownerState.completed && {
        backgroundImage:
            "linear-gradient( 136deg, rgb(0 128 255) 0%, #0080ff 50%, rgb(22 130 253 / 65%) 100%);"
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

    const icons = {
    };



    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
           {(active||completed) ? <AssignmentTurnedInRoundedIcon/> : <WorkHistoryRoundedIcon/> } 
        </ColorlibStepIconRoot>
    );
};

const ColorlibEducationStepIcon = (props) => {
    const { active, completed, className } = props;
    let icon
    const icons = {
    };
    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {(active||completed) ? <BookmarkAddedRoundedIcon/> : <HistoryEduRoundedIcon/> }
        </ColorlibStepIconRoot>
    );
};

const jobSteps = [
    "What's your dream job ?",
    "What have you done do far ?",
    "What's your tailor-made career path ?",
    "What's your next step ?",
    "What's your next step ?",
    "What's your next step ?",
    "What's your next step ?",
    "What's your next step ?",
    "What's your next step ?",
    "What's your next step ?",
    "What's your next step ?",
    

];

const educationSteps = [
    "What's your dream job ?",
    "What have you done do far ?",
];

const CareerPage = ({ barStatus, experienceHistory, educationHistory, targetJob }) => {
    const [isEnable, setIsEnable] = useState(false);
    const [accomplishedJobNum, setAccomplishedJobNum] = useState(0);
    const [pastEducation, setPastEducation] = useState([]);
    const [pastEducationNum, setPastEducationNum] = useState(0);
    const [accomplishedJob, setAccomplishedJob] = useState([]);
    const [dreamJob, setDreamJob] = useState('');
    

    useEffect(() => {
        if (barStatus === 3) {
            setIsEnable(true);
            setAccomplishedJobNum(experienceHistory.length - 1);
            setEducation()
            const exp = JsonData.experiences;
            const jobs = experienceHistory.concat(exp);
            setAccomplishedJob(jobs);
            setPastEducationNum(educationHistory.length -1);
            const dream = targetJob;
            setDreamJob(dream);
            
        }
        else {
            setIsEnable(false);
        }
    }, [barStatus, experienceHistory,educationHistory, targetJob])

    const setEducation = () => {
            const fd = JsonData.firstDegree
            const sd = JsonData.secondDegree
            const edu = educationHistory
            const education = edu.concat(fd,sd)
            setPastEducation(education)
    }


    return (
        <>
            {isEnable &&
                <>
                    <div className="stepper-main-div">
                        <Stepper alternativeLabel activeStep={3} connector={<ColorlibConnector />}>
                            <Step>
                                <StepLabel StepIconComponent={MainJobIcon}></StepLabel>
                            </Step>
                        </Stepper>
                    </div>
                    <div className="recomended-div">
                        <Stepper alternativeLabel activeStep={accomplishedJobNum} connector={<ColorlibConnector />}>
                            {accomplishedJob.map((label,index) => (
                                <Step key={label['Job Title']+index}>
                                    <StepLabel StepIconComponent={ColorlibJobStepIcon}>{label['Job Title']}<br/>{label['duration']?"For: "+ label['duration'] +" months": label ['Company Name']}</StepLabel>
                                </Step>
                            ))}
                            <Step completed={true}>
                                <StepLabel StepIconComponent={ColorlibJobStepIcon}>{dreamJob}</StepLabel>
                            </Step>
                        </Stepper>
                    </div>
                    <div className="stepper-main-div">
                        <Stepper alternativeLabel activeStep={3} connector={<ColorlibConnector />}>
                            <Step>
                                <StepLabel StepIconComponent={MainEducationIcon}></StepLabel>
                            </Step>
                        </Stepper>
                    </div>
                    <div className="recomended-div">
                        <Stepper alternativeLabel activeStep={pastEducationNum} connector={<ColorlibConnector />}>
                            {pastEducation.map((label,index) => (
                                <Step key={label['Degree field']}>
                                    <StepLabel StepIconComponent={ColorlibEducationStepIcon}>{<><>{label['Degree type']+" "+label['Degree field']}</><>{index>pastEducationNum?<><br/><ul>{label['institutionName'].map((inst)=>(<li>{inst}</li>))}</ul></>:<><br/>{label['Instutation Name']}</>}</></>}</StepLabel>
                                </Step>
                            ))}
                            <Step completed={true}>
                                <StepLabel StepIconComponent={ColorlibEducationStepIcon}>Done!</StepLabel>
                            </Step>
                        </Stepper>
                    </div>
                </>
            } </>
    );
};

export default CareerPage;


//<br/><ul>{label['institutionName'].map((inst)=>(<li>{inst}</li>))}</ul>
//<>{label['field']+ " " + label['type']}</>
