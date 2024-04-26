import styled from "@emotion/styled";
import { FormEngineTheme } from "../FormEngine/types";
import React from "react";

export const CustomInput = styled.input`
  
  display: flex;
  width: 100%;
  border: 0px solid grey;
  border-right: none;
  height: 37px;
  line-height: 1;
  align-items: center;
  color: black;
  border-radius: 4px 0 0 4px;


`
// &:<DOM_EVENT> .<className> allows us to respond to DOM events on the parent element while targeting child elements
interface CustomDivProps {
  primaryColor?: FormEngineTheme['primaryColor'];
  highlightColor?: FormEngineTheme['highlightColor'];
  shadowColor?: React.CSSProperties['color'];
  isDragging?: boolean;
  noBorder?: boolean;
  dashed?: boolean;
}
export const CustomDiv = styled.div<CustomDivProps>`
display: flex;
:hover {
  border: ${props => props.noBorder ? '0px' : '1px'}  dashed  ${props => props.isDragging ? '#0268d3' : props.highlightColor};
  
 box-shadow: 0 0 ${props => props.noBorder ? '0px' : '2px'}  ${props => props.highlightColor ? props.highlightColor : "#0268d3"} ; // lighter color of highlight color #add8e6
  color: black;
  background-color: ${props => props.primaryColor ? props.primaryColor : '#6564DB08'};


}
.inputIcon:hover .superimposedLabel:hover {
  color: ${props => props.highlightColor};
}
  mouse: pointer;
width: 100%;

display: flex;
border: ${props => props.noBorder ? '0px' : '1px'} ${props => props.dashed ? 'dashed' : 'solid'} ${props => props.isDragging ? 'red' : props.highlightColor};
height: 39px;
align-items: center;
color: black;
// border-radius: 5px;
justify-items: center;
align-content: center;
  &:hover .hover-icon {
    color: grey;
  }


`

interface CustomSelectProps {
  clicked?: boolean;
  primaryColor?: FormEngineTheme['primaryColor'];
  highlightColor?: FormEngineTheme['highlightColor'];
  shadowColor?: React.CSSProperties['color'];

}
export const CustomSelect = styled.select<CustomSelectProps>`
font-size: 15px;

line-height: 1;
height: auto;
border-radius: 4px;
padding:7px;
border-style: hidden;
border-radius: 4px;
border: 1px dashed ${props => props.primaryColor};
background-color: white;
color: ${props => props.clicked ? 'black' : '#b9b9b9'} ; 
:hover {
  border: 1px solid ${props => props.highlightColor};  
  box-shadow: 0 0 10px ${props => props.shadowColor} ; // lighter color of highlight color #add8e6
  background-color: white; // #6564DB08
}
:disabled {
  background-color: #f2f2f2;
  color: #b9b9b9;
}
`

type CustomCheckboxProps = {
  primaryColor?: FormEngineTheme['primaryColor'];
  highlightColor?: FormEngineTheme['highlightColor'];
  disabled?: boolean;
  clicked?: boolean;
  checked?: boolean;
}


export const CustomCheckbox = styled.div<CustomCheckboxProps>`
  display: inline-block;
  min-width: 20px;  /* fixed width */
  min-height: 20px;  /* fixed height */
  background: ${props => props.checked ? props.primaryColor : 'white'};
  border: 1px solid ${props => props.primaryColor};
  border-radius: 4px;
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    display: ${props => props.checked ? 'block' : 'none'};
    left: 50%;
    top: 40%;
    width: 6px;  /* fixed width */
    height: 12px;  /* fixed height */
    border: 1px solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) translate(-100%, -20%);  /* center the tick */
    
  }

  &:hover {
    border: 1px solid ${props => props.primaryColor};
  }
`
type CustomLabelProps = {
  checked?: boolean;
  shadowColor?: React.CSSProperties['color'];
  highlightColor?: React.CSSProperties['color'];
}

export const CustomLabel = styled.label<CustomLabelProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
  height: 39px;
  border-radius: 4px;
  border-style: hidden;
  border-radius: 4px;
  border: 1px dashed grey;
  background-color: white;
  padding-inline: 10px;
  color:${props => props.checked ? 'black' : 'grey'};
  &:hover {
    border: 1px solid ${props => props.highlightColor};
  
    box-shadow: 0 0 10px ${props => props.shadowColor} ; // lighter color of highlight color #add8e6
    color: black;
    background-color: #6564DB08;
  }

  :disabled {
    background-color: #f2f2f2;
    color: #b9b9b9;
  }
`
type GridProps = {
  cells?: number
  showCells?: boolean;
  solid?: boolean;
}

export const Grid = styled.div<GridProps>`



  display: grid;
  grid-gap: 13px;

  & > div {
    padding: ${props => props.showCells ? '6px' : '0px'};

    border-radius: 8px;
    border: ${props => props.showCells ? `1px ${props.solid ? 'solid' : 'dashed'} #b9b9b9` : `1px  ${props.solid ? 'solid' : 'dashed'} transparent`} ;
    
  }
place-items: center;
margin: 3px 0px 10px 0px;

  // For large screens
  grid-template-columns: ${props => `repeat(${props.cells}, 1fr)`} ;

  // For medium screens
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  // For small screens
  @media (max-width: 576px) {
    grid-template-columns: auto;
  }
`
export type CustomButtonProps = {
  primaryColor?: FormEngineTheme['primaryColor'];
  highlightColor?: FormEngineTheme['highlightColor'];
  disabled?: boolean;
  clicked?: boolean;
}

export const CustomButton = styled.button<CustomButtonProps>`
display: flex;  
background-color: ${props => props.clicked ? props.highlightColor : 'white'};
  color: ${props => props.clicked ? 'white' : 'black'};
  border: 1px solid ${props => props.primaryColor};
  border-radius: 4px;
  height: 36px;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  color:${props => props.primaryColor};
  &:hover {
    background-color: ${props => props.primaryColor};
    color: white;
  }
  &:disabled {
    background-color: #f2f2f2;
    color: #b9b9b9;
  }
`

export const ButtonContainer = styled.div`
display: grid;
place-items: start;
background-color: red;

// For large screens
grid-template-columns: auto auto auto;

// For medium screens
@media (max-width: 768px) {
  grid-template-columns: auto auto;
}

// For small screens
@media (max-width: 576px) {
  grid-template-columns: auto auto;
}
`
type LabelProperties = {
  highlightColor: React.CSSProperties['color'];
  primaryColor: React.CSSProperties['color'];
}
export const SuperImposedLabel = styled.label<LabelProperties>`
  position: absolute; 
  left: 10px;
  top: -10px;
  background-color: #fff;
  padding: 0 5px;
  font-size: 12px; 
  color: ${props => props.primaryColor};
`
//style={{ minWidth: '1000px' }}
export const StyledForm = styled.form`
max-width: 1000px;
width: 100%;

`
