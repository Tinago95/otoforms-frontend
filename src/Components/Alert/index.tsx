import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts(input: { open: boolean, message: string, severity: 'error' | 'info' | 'success' | 'warning', callback: (bool: boolean) => void }) {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        setOpen(input.open)
    }, [input.open])
    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert
                    severity={input.severity}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                input.callback(false)
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {input.message}
                </Alert>
            </Collapse>
        </Box>
    );
}
