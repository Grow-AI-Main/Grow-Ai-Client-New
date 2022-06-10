import { Grid, Typography, Button} from "@mui/material";
import {styled} from "@mui/material/styles";
import { border, borderRadius } from "@mui/system";
import React, { useEffect, useState } from "react";
import JasonData from '../../const/MockJobOpening.json';
import BusinessIcon from '@mui/icons-material/Business';
import '../JobEducationPopUp/index.css';

const openingSection = {
    borderRadius:'16px',
    margin:'auto',
    justifyContent:'center',
    width:'1140px',
    height:'366px',
    backgroundColor:'#FFFFFF',
}

const openingItem = {
    borderRadius:'16px',
    margin:'auto',
    justifyContent:'center',
    backgroundColor: "#E5E5E5",
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
        <Button className="next-buuton" href={Link}>Click me!</Button>
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
                    <Typography variant="h5" color="#43655A">Job openings</Typography>
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
                    <Typography variant="h5" color="#43655A">Education openings</Typography>
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