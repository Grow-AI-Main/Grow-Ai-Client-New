import { Grid, Typography, Button } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import React, { useEffect, useState } from "react";
import JasonData from '../../const/MockJobOpening.json';
import './index.css';

const openingSection = {
    borderRadius: '16px',
    margin: 'auto',
    justifyContent: 'center',
    width: '1140px',
    height: '400px',
    backgroundColor: '#FFFFFF',
}

const openingItem = {
    borderRadius: '16px',
    margin: 'auto',
    justifyContent: 'center',
    backgroundColor: "#2ea5a859",
    width: '270px',
    paddingBottom: '32px',
    height: '300px',
}

const JobOpening = (JobTitle, CompanyName, Description, Link) => {
    return (<Grid item sx={openingItem}>
        <BusinessIcon color="#43655A" />
        <Typography variant="h6">{"Job Title: " + JobTitle}</Typography>
        <Typography variant="h6">{"Company Name: " + CompanyName}</Typography>
        <Typography variant="h6">{"Description: " + Description}</Typography>
        <Button className="job_education_link" href={Link}>Click me!</Button>
    </Grid>)

}

const EduOpening = (Type, Field, InstatutionName, Link) => {
    return (<Grid item sx={openingItem}>
        <LocalLibraryIcon color="#43655A" />
        <Typography variant="h6">{"Degree Type: " + Type}</Typography>
        <Typography variant="h6">{"Degree Field: " + Field}</Typography>
        <Typography variant="h6">{"Instatution Name: " + InstatutionName}</Typography>
        <Button className="job_education_link" href={Link}>Click me!</Button>
    </Grid>)
}

const NextStepPage = ({ barStatus, recomendedEducation, currentPosition }) => {
    const [isEnable, setIsEnable] = useState(false)
    const [openings, setOpenings] = useState([])
    const [education, setEducation] = useState({})

    useEffect(() => {
        if (barStatus === 4) {
            setIsEnable(true)
            getOpenings()
            getEducation()
        }
        else {
            setIsEnable(false)
        }

    }, [barStatus])

    const getOpenings = () => {
        let joblist = []
        JasonData.Jobs.map((job) =>
            joblist.push(JobOpening(job.JobTitle, job.CompanyName, job.Description, job.Link))
        )
        setOpenings(joblist)
    }

    const getEducation = () => {
        let edulist = []
        JasonData.Educations.map((edu) =>
            edulist.push(EduOpening(edu.Type, edu.Field, edu.InstatutionName, edu.Link))
        )
        setEducation(edulist)
    }



    return (<>
        {isEnable && <>
            <div style={{ marginTop: '30px' }}>
                <div style={{ margin: 'auto' }}>
                    <Grid container spacing={4} sx={openingSection}>
                        <Grid item>
                            <Typography variant="h5" sx={{ color: '#324b4b', marginRight: '55px' }}>Job openings</Typography>
                        </Grid>
                        <Grid container spacing={4} justifyContent="center">
                            {openings}
                        </Grid>

                    </Grid>
                </div>
                <br /><br />
                <div style={{ margin: 'auto' }}>
                    <Grid container spacing={4} sx={openingSection}>
                        <Grid item>
                            <Typography variant="h5" sx={{ color: '#324b4b', marginRight: '55px' }}>Education openings</Typography>
                        </Grid>
                        <Grid container spacing={4} justifyContent="center">
                            {education}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>}</>)

}

export default NextStepPage