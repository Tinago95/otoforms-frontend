import { useContext, useEffect, useState } from 'react';
import { FolderOutlined, FolderOpenOutlined, } from "@mui/icons-material";
import { Typography, ThemeProvider, createTheme, TextField, Button } from "@mui/material";
import styled from 'styled-components';
import { FormBuilderContext, FormBuilderContextType } from '../../State/FormBuilder';
type StyledDivProps = {
    isDragging?: boolean;
    highlightColor?: string;
    noBorder?: boolean;
    dashed?: boolean;
    disableHighlight?: boolean;
    selected?: boolean;
};
// Define a styled component for the TextField with ellipsis
const StyledTextField = styled(TextField)`
    width: 100%;

    .MuiInputBase-input {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative; /* Ensure the position context for absolute positioning */
    }

    .ellipsis-indicator {
        position: absolute;
        right: 0;
        bottom: 0;
        padding-right: 8px; /* Adjust padding as needed */
        color: #ccc; /* Adjust color as needed */
    }
`;
const StyledDiv = styled.div<StyledDivProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    background-color: ${props => props.selected ? props.highlightColor ?? '#6564DB' : 'white'};
    padding: 8px;
    border-radius: 4px;
    width: 90%;
    transition: background-color 0.3s ease, border-color 0.1s ease;
    cursor: pointer;
    border: 1px ${props => props.dashed ? 'dashed' : 'solid'} ${props => props.selected ? props.highlightColor ?? '#6564DB' : '#A9A9A9'};
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        border: 1px solid ${props => props.highlightColor ?? '#6564DB'};
        box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 0px ${props => props.highlightColor ?? '#6564DB'};
        transition: box-shadow 0.1s ease-in-out;
    }

    // Check if the text overflows the container
    &.overflowed {
        text-overflow: unset;
    }
`;


const StyledTypography = styled(Typography)`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const theme = createTheme({
    palette: {
        primary: {
            main: "#6D6A75",
        },
        secondary: {
            main: "#ff0000",
        },
        action: {
            active: "#ffffff",
        },
        info: {
            main: "#6564DB",
        },
    },
});


export const FormFolder = (input: { label: string, id: string }) => {
    const { id, label } = input;
    const [isHovering, setIsHovering] = useState(false);
    const [selected, setSelected] = useState<boolean>(false);
    const { selectedFormId, setSelectedFormId } = useContext(FormBuilderContext) as FormBuilderContextType;
    const [truncatedLabel, setTruncatedLabel] = useState<string | null>(null);
    const [isOverflowed, setIsOverflowed] = useState<boolean>(false);

    useEffect(() => {
        setSelected(selectedFormId === id);
    }, [selectedFormId, id]);


    useEffect(() => {
        const styledDiv = document.getElementById(id);
        if (styledDiv) {
            setIsOverflowed(styledDiv.scrollWidth > styledDiv.clientWidth);
        }
    }, [label]);

    const handleClick = () => {
        setSelectedFormId(id);
    };



    // Function to truncate the text and append "..." if it overflows
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return (
 <ThemeProvider theme={theme}>
            <StyledDiv
                id={id}
                selected={selected}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleClick}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px', height: '1em', padding: '0.1em' }}>
                    {selected ?
                        <FolderOpenOutlined style={{ fontSize: '1em' }} key={id.concat('icon-1')} color={isHovering || selected ? (isHovering && !selected ? "info" : "action") : "primary"} /> :
                        <FolderOutlined style={{ fontSize: '0.8em' }} key={id.concat('icon-2')} color={isHovering || selected ? (isHovering && !selected ? "info" : "action") : "primary"} />
                    }
                      <Typography key={id.concat('typo')} variant='body2' fontFamily={'inherit'} color={isHovering || selected ? (isHovering && !selected ? "#6564DB" : "action") : "primary"} >
                        {isOverflowed ? `${label.slice(0, 10)}...` : label}
                    </Typography>
                </div>
            </StyledDiv>
        </ThemeProvider>
    );
}

export const EditableFolder = (input: { label: string, callback: (input: string) => void }) => {
    const { label } = input;
    const [isHovering, setIsHovering] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [labelText, setLabelText] = useState(label);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const onDone = () => {
        input.callback(labelText);
        setLabelText('');
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLabelText(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledDiv
                disableHighlight={true}
                dashed={true}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleClick}
            >
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: labelText ? '10px' : '0px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px', minHeight: '50px' }}>
                        <FolderOutlined style={{fontSize:'1em'}}  color="primary" />
                        <StyledTextField
                            InputProps={{
                                style: {
                                    fontSize:'0.7em',
                                    border: '1px solid transparent',
                                }
                            }}
                            value={labelText}
                            onChange={handleTextChange}
                            placeholder='Add New Form'
                            variant="outlined"
                            size="small"
                        />
                        {/* Render ellipsis indicator if text is truncated */}
                        {labelText.length > 50 && (
                            <span className="ellipsis-indicator">...</span>
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '5px', width: '100%' }}>
                        {labelText && (
                            <>
                                <Button variant='outlined' onClick={onDone} style={{ width: '100%',fontSize:'0.5em' }} color="info">Add</Button>
                                <Button onClick={() => setLabelText('')} style={{ width: '100%',fontSize:'0.5em' }} variant='outlined' color="secondary">Cancel</Button>
                            </>
                        )}
                    </div>
                </div>
            </StyledDiv>
        </ThemeProvider>
    );
};
