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
const StyledDiv = styled.div<StyledDivProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    background-color:  ${props => props.selected ? props.highlightColor ?? '#6564DB' : 'white'};
    padding: 8px;
    border-radius: 4px;
    //
    width: 100%;
    transition: background-color 0.3s ease, border-color 0.1s ease;
    cursor: pointer;
    border: 1px solid transparent; // Add this line
    // border-color:  rgba(0, 0, 0, 0.15);
    border: 1px ${props => props.dashed ? 'dashed' : 'solid'} ${props => props.selected ? props.highlightColor ?? '#6564DB' : '#A9A9A9'};
  
    &:hover {
        // background-color: ${props => props.disableHighlight ? 'white' : props.highlightColor ?? 'rgb(255, 247, 234)'};
        border: 1px solid  ${props => props.highlightColor ?? '#6564DB'};
        box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 0px ${props => props.highlightColor ?? '#6564DB'};
        transition: box-shadow 0.1s ease-in-out;
    }
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
    const [selected, setSelected] = useState<boolean>(false); // Add a state for the selected folder
    const { selectedFormId, setSelectedFormId } = useContext(FormBuilderContext) as FormBuilderContextType;

    useEffect(() => {
        setSelected(selectedFormId === id);
    }, [selectedFormId, id]);

    const handleClick = () => {
        setSelectedFormId(id);
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledDiv
                key={id}
                selected={selected}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleClick}
            >
                <div key={id.concat('div')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px', minHeight: '30px' }}>
                    {selected ?
                        <FolderOpenOutlined key={id.concat('icon-1')} color={isHovering || selected ? (isHovering && !selected ? "info" : "action") : "primary"} /> :
                        <FolderOutlined key={id.concat('icon-2')} color={isHovering || selected ? (isHovering && !selected ? "info" : "action") : "primary"} />
                    }
                    <Typography key={id.concat('typo')} variant='body2' fontFamily={'inherit'} color={isHovering || selected ? (isHovering && !selected ? "#6564DB" : "action") : "primary"} >
                        {label}
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
    const [labelText, setLabelText] = useState(label); // Add a state for the label text

    const handleClick = () => {
        setIsOpen(!isOpen);


    };

    const onDone = () => {
        input.callback(labelText)
        setLabelText('')
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Add a handler for the text change
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px', minHeight: '20px' }}>

                        <FolderOutlined color="primary" />

                        <TextField
                            InputProps={{
                                style: {
                                    border: '1px solid transparent',
                                }
                            }}
                            value={labelText}
                            onChange={handleTextChange}
                            placeholder='Add New Form'
                            variant="outlined"
                            size="small"
                        />

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '5px'}}>
                        {labelText && (
                            <>
                                <Button variant='outlined' onClick={onDone} style={{ width: '100%' }} color="info">Add</Button>
                                <Button onClick={() => setLabelText('')} style={{ width: '100%' }} variant='outlined' color="secondary">Cancel</Button>
                            </>
                        )}
                    </div>


                </div>
            </StyledDiv>
        </ThemeProvider>
    );
}