import { styled, TextField, Box, Container } from '@mui/material'
import emotion from '@emotion/styled'
import React from 'react';
// Define your styled TextField
type StyledTextFieldProps = {
    highlightColor: React.CSSProperties['color']
    span?: number

}
export const StyledTextField = styled(TextField)<StyledTextFieldProps>({
    // Add your custom styles here
    '&& label.Mui-focused': {
        color: (props: StyledTextFieldProps) => `${props.highlightColor} !important`,
    },
    '&& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '&& .MuiOutlinedInput-root': {
        '&& fieldset': {
            borderColor: (props: StyledTextFieldProps) => `${props.highlightColor} !important`,
        },
        '&&:hover fieldset': {
            borderColor: (props: StyledTextFieldProps) => `${props.highlightColor} !important`,
        },
        '&&.Mui-focused fieldset': {
            borderColor: (props: StyledTextFieldProps) => `${props.highlightColor} !important`,
        },
    },
});


export const StyledBox = styled(Box)<StyledTextFieldProps>({
    gridColumn: `span ${(props: StyledTextFieldProps) => props.span}`,
    border: '1px dashed #b9b9b9 !important',
    backgroundColor: 'white',
    transition: 'border 0.3s ease',
    'hover': {
        border: (props: StyledTextFieldProps) => `1px dashed  ${props.highlightColor} !important`,
    },
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'start',
    color: 'grey',
    // fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
});

// Styled Image Preview
export const ImagePreview = emotion.img`

// width: 100%;
height:100%;
display: flex;

`;
export const StyledImageInput = emotion.input`
  display: none;
`;
export const CustomUploadLabel = emotion.label`
 /* Set the width to match the container */
border-radius: 4px;
gap:5px;
background-color:  white;
// box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
display: flex;
align-items: center;
justify-content: center;

height:280px;
color: grey;
font-weight: bold;
cursor: pointer;

`;