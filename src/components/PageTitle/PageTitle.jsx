import React, { useState ,useEffect} from "react";
import { styled } from "@mui/material/styles";
import { titles } from "../../const/pageTitles";

const TitleStyled = styled("div")`
width: 50%;
margin-left: 25%;
margin-top: 3%;
font-family: 'inherit';
font-style: normal;
font-weight: 700;
font-size: 60px;
line-height: 54px;
text-align: center;
color: #1682FD;
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