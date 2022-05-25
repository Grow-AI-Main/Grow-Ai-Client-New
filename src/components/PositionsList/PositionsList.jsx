import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Position from "../Position/Position";
import { styled } from "@mui/material/styles";


const PositionListStyled = styled("div")`
width: 60%;
margin-left: 20%;
margin-top: 5%;
background-color: transparent;
`;

const PositionList = ({ positions, setCurrentPosition, setNextStep }) => {
    const [isPositionsEnable, setIsPositionsEnable] = useState(true);
    return (
        <>
            {isPositionsEnable &&
                <PositionListStyled>
                    < Grid container spacing={1} >
                        {
                            positions.map((item, index) => (
                                <Grid item spacing={3} key={index}>
                                    <Position setCurrentPosition={setCurrentPosition} text={item} setNextStep={setNextStep} setIsPositionsEnable={setIsPositionsEnable} />
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