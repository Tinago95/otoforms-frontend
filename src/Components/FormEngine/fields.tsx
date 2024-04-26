import React, { useState, useEffect } from "react";
import {
    FieldProps,
    FieldType,
    FormEngineTheme,
} from "./types";
import _ from "lodash";
import * as icons from "@mui/icons-material";
import {
    convertStringToBoolean,
    getColorCode,
} from "../../libs/common";
import { CustomDiv } from "../CustomElements";
import * as nanoid from "nanoid";
import {
    Avatar,
    Box,
    Checkbox,
    Chip,
    FormControl,
    FormControlLabel,
    IconButton,
    Input,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import {
    StyledTextField,
    StyledBox,
    CustomUploadLabel,
    ImagePreview,
    StyledImageInput,
} from "./FieldComponents/styled";
import { Button } from "@aws-amplify/ui-react";
import ToggleButtons from "./toggleMenue";

icons.AbcTwoTone;

export let CustomTextField = (fieldProps: FieldProps) => {
    const icon = fieldProps.icon as string ?? "Abc";
    const editMode = fieldProps.editMode as boolean;
    let IconComponent = _.get(icons, icon);
    const IconWrapper = () => (
        <IconComponent
            key={"cs-input-icon"}
            className="inputIcon"
            sx={{ color: "#707070" }}
        />
    );

    const [name, setName] = useState(
        fieldProps?.preFillData?.[fieldProps.id] as string
    );

    const theme = fieldProps.theme as FormEngineTheme;
    const errorColor = theme?.errorColor ?? "red";
    const highlightColor =
        fieldProps.errors &&
            fieldProps.errors.find((error) => error.id === fieldProps.id)
            ? errorColor
            : theme?.highlightColor ?? "#6564DB";
    const primaryColor = theme?.primaryColor ?? "#b9b9b9";

    return (<div style={{ display: 'flex', width: '100%' }}>
        <TextField
            style={{ width: "100%", height: "100%" }}
            error={
                fieldProps.errors &&
                    fieldProps.errors.find((error) => error.id === fieldProps.id)
                    ? true
                    : false
            }
            name={fieldProps.id}
            label={fieldProps.label}
            value={name}
            size="small"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
            }}
            InputProps={{
                sx: {
                    backgroundColor: "white",
                    "&:hover fieldset": {
                        border: `1px solid ${highlightColor}!important`,
                    },
                    "&:focus-within fieldset, &:focus-visible fieldset": {
                        border: `1px solid ${highlightColor}!important`,
                    },
                },
                endAdornment: <InputAdornment position="end"><IconWrapper /></InputAdornment>,
            }}
        />
        {editMode && <FieldEditor onFieldDelete={fieldProps.onFieldDelete} onFieldEdit={fieldProps.onFieldEdit} uuid={fieldProps.uuid} />}

    </div>

    );
};

export let CustomCheckboxField = (fieldProps: FieldProps) => {
    const editMode = fieldProps.editMode as boolean;
    const [isChecked, setIsChecked] = useState<boolean>(
        fieldProps?.preFillData?.[fieldProps.id]
            ? convertStringToBoolean(
                fieldProps?.preFillData?.[fieldProps.id] as string
            )
            : false
    );

    const theme = fieldProps.theme as FormEngineTheme;
    const highlightColor = theme?.highlightColor ?? "#6564DB";
    const primaryColor = theme?.primaryColor ?? "#b9b9b9";
    const errorColor = theme?.errorColor ?? "red";
    const randomUUID = nanoid.customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        18
    );

    const [checked, setChecked] = useState(true);
    const label = { inputProps: { "aria-label": fieldProps.label } };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (<div style={{ display: 'flex', width: '100%' }}>
        <StyledBox span={fieldProps.theme?.gridSpan ?? 1} highlightColor={highlightColor}>
            <FormControlLabel
                control={<Checkbox size="small" style={{ left: "10px", marginRight: "5px" }} name={fieldProps.id} />}
                label={fieldProps.label}
            />
        </StyledBox>
        {editMode && <FieldEditor onFieldDelete={fieldProps.onFieldDelete} onFieldEdit={fieldProps.onFieldEdit} uuid={fieldProps.uuid} />}

    </div>
    );
};

export let CustomSelectField = (fieldProps: FieldProps) => {
    const editMode = fieldProps.editMode as boolean;
    const [value, setValue] = useState<string>(
        fieldProps?.preFillData?.[fieldProps.id] as string
    );
    const [clicked, setClicked] = useState<boolean>(false);
    const theme = fieldProps.theme as FormEngineTheme;
    const errorColor = theme?.errorColor ?? "red";
    const highlightColor =
        fieldProps.errors &&
            fieldProps.errors.find((error) => error.id === fieldProps.id)
            ? errorColor
            : theme?.highlightColor ?? "#6564DB";
    const primaryColor = theme?.primaryColor ?? "#b9b9b9";
    let IconComponent = _.get(icons, "ChevronLeft");
    const [personName, setPersonName] = useState<string[]>([]);
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (<div style={{ display: 'flex', width: '100%' }}>
        <Select
            size="small"
            sx={{
                gridColumn: `span ${fieldProps.theme?.gridSpan ?? 1}`,
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                "&:hover fieldset": {
                    border: `1px solid ${highlightColor}!important`,
                },
            }}
            displayEmpty
            error={
                fieldProps.errors &&
                    fieldProps.errors.find((error) => error.id === fieldProps.id)
                    ? true
                    : false
            }
            name={fieldProps.id}
            value={personName}
            onChange={handleChange}
            placeholder={fieldProps.label}
            input={<OutlinedInput />}
            renderValue={(selected: any[]) => {
                if (selected.length === 0) {
                    return <span style={{ color: primaryColor }}>{fieldProps.label}</span>;
                }
                return selected.join(", ");
            }}
        >
            {fieldProps.options?.map((option) => (
                <MenuItem key={option} value={option}>
                    <Box flexGrow={1}>{option}</Box>
                </MenuItem>
            ))}
        </Select>
        {editMode && <FieldEditor onFieldDelete={fieldProps.onFieldDelete} onFieldEdit={fieldProps.onFieldEdit} uuid={fieldProps.uuid} />}

    </div>
    );
};

export let CustomDateField = (fieldProps: FieldProps) => {
    const editMode = fieldProps.editMode as boolean;
    const theme = fieldProps.theme as FormEngineTheme;
    const errorColor = getColorCode("red");
    const highlightColor =
        fieldProps.errors &&
            fieldProps.errors.find((error) => error.id === fieldProps.id)
            ? errorColor
            : theme?.highlightColor ?? "#6564DB";
    const primaryColor = theme?.primaryColor ?? "#b9b9b9";
    const customTheme = createTheme({
        palette: {
            primary: {
                main: highlightColor, // Use your custom color
            },
            secondary: {
                main: getColorCode("red"), // Use your custom color
            },
        },
    });
    return (<div style={{ display: 'flex', width: '100%' }}>
        <ThemeProvider theme={customTheme}>
            <StyledTextField
                style={{ gridColumn: `span ${fieldProps.theme?.gridSpan ?? 1}` }}
                highlightColor={highlightColor}
                error={
                    fieldProps.errors &&
                        fieldProps.errors.find((error) => error.id === fieldProps.id)
                        ? true
                        : false
                }
                id="outlined-uncontrolled"
                label={fieldProps.label}
                defaultValue={
                    fieldProps.preFillData
                        ? (fieldProps.preFillData[fieldProps.id] as string)
                        : ""
                }
                type="date"
                size="small"
                name={fieldProps.id}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    width: "100%",
                    height: "100%",
                    "&:hover fieldset": {
                        border: `1px solid ${highlightColor}!important`,
                    },
                    "&:focus-within fieldset, &:focus-visible fieldset": {
                        border: `1px solid ${highlightColor}!important`,
                    },
                }}
            />
        </ThemeProvider>
        {editMode && <FieldEditor onFieldDelete={fieldProps.onFieldDelete} onFieldEdit={fieldProps.onFieldEdit} uuid={fieldProps.uuid} />}

    </div>
    );
};

export const MultiLineTextField = (fieldProps: FieldProps) => {
    const [value, setvalue] = useState<string>('');
    const editMode = fieldProps.editMode as boolean;
    const theme = fieldProps.theme as FormEngineTheme;
    const errorColor = getColorCode("red");
    const highlightColor =
        fieldProps.errors &&
            fieldProps.errors.find((error) => error.id === fieldProps.id)
            ? errorColor
            : theme?.highlightColor ?? "#6564DB";
    const primaryColor = theme?.primaryColor ?? "#b9b9b9";
    const icon = fieldProps.icon as string ?? "Abc";
    let IconComponent = _.get(icons, icon);

    return (<div style={{ display: 'flex', width: '100%', gridColumn: `span ${fieldProps.theme?.gridSpan ?? 3}`, flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'whitesmoke', gap: '5px' }}><ToggleButtons /> <Chip color='primary' avatar={<Avatar>{value.length ? value.split(' ').length : 0}</Avatar>} label="words" /></div>
        <TextField
            style={{ width: "100%", height: "100%", gridColumn: `span ${fieldProps.theme?.gridSpan ?? 3}` }}
            error={
                fieldProps.errors &&
                    fieldProps.errors.find((error) => error.id === fieldProps.id)
                    ? true
                    : false
            }
            name={fieldProps.id}
            label={fieldProps.label}
            value={
                fieldProps.preFillData
                    ? (fieldProps.preFillData[fieldProps.id] as string)
                    : ""
            }
            size="small"
            multiline
            rows={12}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setvalue(event.target.value) }}
            InputProps={{
                sx: {
                    backgroundColor: "white",
                    "&:hover fieldset": {
                        border: `1px solid ${highlightColor}!important`,
                    },
                    "&:focus-within fieldset, &:focus-visible fieldset": {
                        border: `1px solid ${highlightColor}!important`,
                    },
                },

            }}
        />
        <div>{editMode && <FieldEditor onFieldDelete={fieldProps.onFieldDelete} onFieldEdit={fieldProps.onFieldEdit} uuid={fieldProps.uuid} />}</div>
    </div>
    );
};

export const MultiText = (fieldProps: FieldProps) => {
    const [values, setValues] = useState<string[]>([]);
    const [currValue, setCurrValue] = useState<string>("");
    const editMode = fieldProps.editMode as boolean;
    const handleKeyUp = (e: any) => {
        console.log(e.keyCode);
        if (e.keyCode == 32) {
            setValues((oldState) => [...oldState, e.target.value]);
            setCurrValue("");
        }
    };
    useEffect(() => {
        console.log(values);
    }, [values]);
    const handleChange = (e: any) => {
        setCurrValue(e.target.value);
    };
    const handleDelete = (item: any, index: any) => {
        let arr = [...values];
        arr.splice(index, 1);
        console.log(item);
        setValues(arr);
    };

    const commaSeparatedValues = values.join(","); // Create comma-separated list of values
    return (
        <div style={{ display: "flex", width: "100%", justifyContent: "center", justifyItems: "center", flexDirection: "column", gap: "10px", gridColumn: `span ${fieldProps.theme?.gridSpan ?? 3}` }}>
            <TextField
                autoComplete={fieldProps.autoFill ?? "off"}
                error={
                    fieldProps.errors &&
                        fieldProps.errors.find((error) => error.id === fieldProps.id)
                        ? true
                        : false
                }
                variant="outlined"
                sx={{ width: "100%", height: "100%" }}
                name={fieldProps.id}
                value={currValue}
                size={"small"}
                onChange={handleChange}
                onKeyDown={handleKeyUp}
                placeholder={fieldProps.label}
            />
            <div className={"container"} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: '5px' }}>
                {values.map((item, index) => (
                    <Chip color="primary" key={index} size="small" onDelete={() => handleDelete(item, index)} label={item} />
                ))}
            </div>
            <input type="hidden" name={fieldProps.id} value={commaSeparatedValues} /> {/* Pass comma-separated values to an invisible input field */}
            {editMode && <FieldEditor onFieldDelete={fieldProps.onFieldDelete} onFieldEdit={fieldProps.onFieldEdit} uuid={fieldProps.uuid} />}
        </div>
    );
};


const UploadedFiles = (props: { files: File[], onDelete: (index: number) => void }) => {
    let IconComponent = _.get(icons, 'Delete');
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '5px',
            borderRadius: '5px',
            maxHeight: '200px',
            position: 'relative' // Make the container relative for absolute positioning of Typography
        }}>
            {/* <Typography color="grey" style={{ top: 0, zIndex: 1, padding: '5px 0', textAlign: 'center' }}>Uploaded Forms</Typography> */}
            {props.files.map((file, index) => (
                <div key={index} style={{
                    backgroundColor: '#7F7CE3',
                    padding: '10px',
                    borderRadius: '5px',
                    color: '#fff',
                    marginBottom: '5px',
                    overflowWrap: 'break-word',
                    position: 'relative'
                }}>
                    <span>{file.name}</span>
                    <IconButton onClick={() => props.onDelete(index)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}> <IconComponent /></IconButton>
                </div>
            ))}
        </div>
    );
}

export const ImageField = (fieldProps: FieldProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    let IconComponent = _.get(icons, 'CloudUploadOutlined');

    useEffect(() => {
        const urls: string[] = [];
        files.forEach(file => {
            urls.push(URL.createObjectURL(file));
        });
        setPreviewUrls(urls);
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [files]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif']; // Allowed file extensions
            const newFiles: File[] = [];
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const extension = file.name.split('.').pop()?.toLowerCase(); // Get the file extension
                if (extension && allowedExtensions.includes(extension)) {
                    newFiles.push(file);
                }
            }
            if (newFiles.length > 0) {
                setFiles(prevFiles => [...prevFiles, ...newFiles]);
            } else {
                // If no valid files were selected, you can display an error message or take appropriate action
                alert("Please select valid files (PDF, DOC, DOCX, JPG, JPEG, PNG, GIF).");
            }
        }
    };

    const handleDeleteFile = (index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div style={{ border: '1px dashed #b9b9b9', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '10px', padding: '10px', width: '100%', gridColumn: 'span 3', height: '300px' }}>
            <div style={{ gridColumn: 'span 2' }}>
                <CustomUploadLabel htmlFor={fieldProps.uuid}>
                    <IconComponent style={{ fontSize: '1.8em' }} />
                    <Typography variant="body2" >Upload Files</Typography>
                </CustomUploadLabel>
                <StyledImageInput
                    type="file"
                    name="name"
                    id={fieldProps.uuid}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif" // Restrict accepted file types
                    multiple // Allow multiple file selection
                />
            </div>

            {files.length > 0 &&
                <div style={{ gridColumn: 'span 2', height: '100%', overflowY: 'auto' }}>
                    <UploadedFiles files={files} onDelete={handleDeleteFile} />
                </div>
            }
        </div>
    );
};




//######################################
const FieldEditor = (props: { uuid: string, onFieldDelete?: (uuid: string) => void, onFieldEdit?: (uuid: string) => void }) => {
    let DeleteIcon = _.get(icons, "Delete");
    let EditIcon = _.get(icons, "ModeEdit");
    return (<div style={{ display: 'flex' }}>
        <IconButton
            onClick={() => { props.onFieldDelete && props.onFieldDelete(props.uuid) }}
            size="small" color="warning">
            <DeleteIcon
                // color="error"

                key={"cs-input-icon"}
                className="inputIcon"
            // sx={{ color: "#707070" }}
            />
        </IconButton>
    </div>

    );
}
