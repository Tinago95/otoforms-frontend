import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import * as icons from '@mui/icons-material';
export function ToggleView(props: { callback?: (input: string) => void }) {
    const [alignment, setAlignment] = React.useState('edit');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
        props.callback && props.callback(newAlignment)
    };

    const children = [
        <ToggleButton value="edit" key="edit">
            <icons.Edit />
        </ToggleButton>,
        <ToggleButton value="preview" key="preview">
            <icons.RemoveRedEye />
        </ToggleButton>,

    ];

    const control = {
        value: alignment,
        onChange: handleChange,
        exclusive: true,
    };

    return (
        <Stack spacing={2} alignItems="center">
            <ToggleButtonGroup color="info" size="small" {...control} aria-label="Large sizes">
                {children}
            </ToggleButtonGroup>
        </Stack>
    );
}