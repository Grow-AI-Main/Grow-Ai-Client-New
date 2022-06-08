import React from "react";
import { styled } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import './index.css'

const ItemDataGridStyled = styled("div")`
background: #FFFFFF;
font-size: 25px;
color:black;
border-top: 1.5px solid black;
`;

const ItemDataStyled = styled("div")`
display: flex;
background: #FFFFFF;
`;

const ItemDataTitleStyled = styled("div")`
margin-bottom:3%;
margin-left: 3%;
`;

const ItemDataValueStyled = styled("div")`
margin-left: 3%;
color:Gray;
`;

const DeleteIconStyled = styled(DeleteIcon)(({ }) => ({
    marginLeft: '97%',
    marginTop: '-24px',
    color: '#c5356a'
}));

const EducationJobItem = ({ index, firstTitle, secondTitle, firstTitleValue, secondTitleValue, removeEducationOrJob }) => {

    const onTrashClick = () => {
        removeEducationOrJob(index);
    };

    return (
        <>
            <ItemDataGridStyled>
                <ItemDataStyled>
                    <ItemDataTitleStyled>
                        {firstTitle}:
                    </ItemDataTitleStyled>
                    <ItemDataValueStyled>
                        {firstTitleValue}
                    </ItemDataValueStyled>
                </ItemDataStyled>
                <ItemDataStyled>
                    <ItemDataTitleStyled>
                        {secondTitle}:
                    </ItemDataTitleStyled>
                    <ItemDataValueStyled>
                        {secondTitleValue}
                    </ItemDataValueStyled>
                </ItemDataStyled>
            </ItemDataGridStyled>
            <DeleteIconStyled onClick={onTrashClick} />
        </>
    )
};

export default EducationJobItem;