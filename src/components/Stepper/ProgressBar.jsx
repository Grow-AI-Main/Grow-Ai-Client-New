import React from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Filter1OutlinedIcon from '@mui/icons-material/Filter1Outlined';
import Filter2OutlinedIcon from '@mui/icons-material/Filter2Outlined';
import Filter3OutlinedIcon from '@mui/icons-material/Filter3Outlined';
import Filter4OutlinedIcon from '@mui/icons-material/Filter4Outlined';
import Filter5OutlinedIcon from '@mui/icons-material/Filter5Outlined';
import StepConnector, {
    stepConnectorClasses
} from "@mui/material/StepConnector";
import './index.css';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 136deg, #40514e 0%, #11999e 50%, #40514e 100%)"
        }
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                "linear-gradient( 136deg, #40514e 0%, #11999e 50%, #40514e 100%)"
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
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        backgroundImage:
            "linear-gradient( 136deg, #11999e 0%, #3dabad 50%, #40514e 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    }),
    ...(ownerState.completed && {
        backgroundImage:
            "linear-gradient( 136deg, #11999e 0%, #3dabad 50%, #40514e 100%)"
    })
}));

const ColorlibStepIcon = (props) => {
    const { active, completed, className } = props;

    const icons = {
        1: <Filter1OutlinedIcon />,
        2: <Filter2OutlinedIcon />,
        3: <Filter3OutlinedIcon />,
        4: <Filter4OutlinedIcon />,
        5: <Filter5OutlinedIcon />
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
};

const steps = [
    "What's your dream job ?",
    "What have you studied so far ?",
    "What have you done so far ?",
    "What's your tailor-made career path ?",
    "What's your next step?"
];

const ProgressBar = ({ barStatus }) => {
    return (
        <div className="stepper-div">
            <Stepper sx={{marginTop:'45px'}} alternativeLabel activeStep={barStatus} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default ProgressBar;
