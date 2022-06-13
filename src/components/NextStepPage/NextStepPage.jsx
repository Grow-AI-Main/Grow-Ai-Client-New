import { Grid, Typography, Button } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import React, { useEffect, useState } from "react";
import './index.css';
import { getJobAdds, getEducationAdds } from "../../services/backendService";

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
        {Description !=="" ? <Typography variant="h6">{"Description: " + Description}</Typography> : <></>}
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
    const [education, setEducation] = useState([])

    useEffect(() => {

        const fetchJobsAdds = async (currentPosition) =>{
            const returnJobs = await getJobAdds(currentPosition)
            getOpenings(returnJobs)
        }
        
        const fetchEducationAdds = async (recomendedEducation) =>{
            const returnEdu = await getEducationAdds(recomendedEducation)
            getEducation(returnEdu)
        }
        

        if (barStatus === 4) {
            setIsEnable(true)
            fetchJobsAdds(currentPosition)
            fetchEducationAdds(recomendedEducation)
        }
        else {
            setIsEnable(false)
        }

    }, [barStatus])

    const getOpenings = (jobAdds) => {
        let joblist = []
        jobAdds.jobs.forEach(job => {
            joblist.push(JobOpening(job.jobTitle, job.companyName, job.description, job.link))
        },)
        setOpenings(joblist)
    }

    const getEducation = (eduAdds) => {
        let edulist = []
        eduAdds.map((edu) =>{
            edulist.push(EduOpening(edu.type, edu.field, edu.institutionName, edu.link))
        })
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