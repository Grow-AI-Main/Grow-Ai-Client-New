import { Grid, Typography, Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import { border, borderRadius } from "@mui/system";
import React, { useEffect, useState } from "react";
import JasonData from '../../const/MockJobOpening.json';
import BusinessIcon from '@mui/icons-material/Business';

const openingSection = {
    borderRadius:'16px',
    margin:'auto',
    justifyContent:'center',
    width:'1140px',
    height:'366px',
    backgroundImage: "linear-gradient(107.15deg, #EFAFBC 0%, #C3E3FA 100%)",
}

const openingItem = {
    borderRadius:'16px',
    margin:'auto',
    justifyContent:'center',
    backgroundColor: "#DDC4D5",
    width:'273px',
    height:'279px',
}

const JobOpening = (JobTitle, CompanyName, Description, Link) =>
{

    console.log(JobTitle)
    return(<Grid item sx={openingItem}>
        <BusinessIcon color="success"/>
        <Typography variant="h6">{"Job Title: " + JobTitle}</Typography>
        <Typography variant="h6">{"Company Name:"+ CompanyName}</Typography>
        <Typography variant="h6">{"Description :" + Description}</Typography>
        <Button variant="contained" href={Link}>Click me!</Button>
    </Grid>)

}

const NextStepPage = ({barStatus}) =>
{
    const [isEnable, setIsEnable] = useState(false)
    const [openings, setOpenings] = useState([])

    useEffect(()=>
    {
        if(barStatus === 4)
        {
            setIsEnable(true)
            getOpenings()
        }
        else
        {
            setIsEnable(false)
        }

    }, [barStatus])

    const getOpenings = () => {
        let joblist = []
        JasonData.Jobs.map((job) => {
            joblist.push(JobOpening(job.JobTitle, job.CompanyName, job.Description, job.Link))
        })
        setOpenings(joblist)
    }

    
    return (<>{isEnable && <>
    <div style={{marginTop:'30px'}}>
        <div style={{margin:'auto'}}>
            <Grid container spacing={4} sx={openingSection}>
                <Grid item>
                    <Typography variant="h5" color="#934405">Job openings</Typography>
                </Grid>
                <Grid container spacing={4} justifyContent="center">
                    {openings}
                </Grid>
                
            </Grid>   
        </div>
        <br/><br/>
        <div style={{margin:'auto'}}>
            <Grid container spacing={4} sx={openingSection}>
                <Grid item>
                    <Typography variant="h5" color="#934405">Education openings</Typography>
                </Grid>
                <Grid container spacing={4} justifyContent="center">
                    {openings}
                </Grid>
                
            </Grid>   
        </div>
    </div>
    </>}</>)

}

export default NextStepPage