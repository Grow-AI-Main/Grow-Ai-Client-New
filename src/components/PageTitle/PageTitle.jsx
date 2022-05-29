import React, { useState ,useEffect} from "react";
import { styled } from "@mui/material/styles";
import { titles } from "../../const/pageTitles";

const TitleStyled = styled("div")`
width: 60%;
margin-left: 20%;
margin-top: 3%;
font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 60px;
line-height: 54px;
text-align: center;
color: #f48023;
text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const PageTitle = ({ barStatus }) => {
    const [title, SetTitle] = useState()
    
    useEffect(() => {
        SetTitle(titles[barStatus])
    }, [barStatus])

    return (
        <>
            <TitleStyled>
                {title}
            </TitleStyled>
        </>
    )
};

export default PageTitle;