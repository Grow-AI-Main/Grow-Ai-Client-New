import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Position from "../Position/Position";
import { styled } from "@mui/material/styles";
import { getDestinationJobs } from "../../services/backendService";


const PositionListStyled = styled("div")`
width: 60%;
margin-left: 20%;
margin-top: 5%;
background-color: transparent;
`;

const PositionList = ({ barStatus, setCurrentPosition, setNextStep }) => {
    const [isPositionsEnable, setIsPositionsEnable] = useState(true);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDestinationJobs();
            setPositions(data);
        }
        fetchData();

        if (barStatus === 0) {
            setIsPositionsEnable(true);
        }
        else {
            setIsPositionsEnable(false);
        }
    }, [barStatus])


    return (
        <>
            {isPositionsEnable &&
                <PositionListStyled>
                    < Grid container spacing={1} >
                        {
                            positions.map((item, index) => (
                                <Grid item spacing={3} key={index}>
                                    <Position setCurrentPosition={setCurrentPosition} text={item} setNextStep={setNextStep}/>
                                </Grid>
                            ))
                        }
                    </Grid >
                </PositionListStyled >
            }
        </>
    );
};

export default PositionList;