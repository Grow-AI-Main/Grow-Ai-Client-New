import React from "react";
import { styled } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import './index.css'

const ItemDataGridStyled = styled("div")`
height: 12%;
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
font-weight: normal;
margin-bottom:3%;
margin-left: 3%;
`;

const ItemDataValueStyled = styled("div")`
margin-left: 3%;
color:Gray;
`;

const DeleteIconStyled = styled(DeleteIcon)(({ }) => ({
    marginLeft: '471%',
    marginTop: '-16%',
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
                        <DeleteIconStyled onClick={onTrashClick} />
                    </ItemDataValueStyled>
                </ItemDataStyled>
            </ItemDataGridStyled>
        </>
    )
};

export default EducationJobItem;