import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { ConfigureField } from './configureField';
import { FieldType } from '../../Components/FormEngine/types';

type Anchor = 'top' | 'left' | 'bottom' | 'right';


export default function TemporaryDrawer(props: { anchor: Anchor, open: boolean, toggleDrawer: (bool: boolean) => void, type: FieldType, onCancel: () => void, onSave: (input: { [key: string]: any }) => void }) {
    const { anchor, open, toggleDrawer: toggle, type, onCancel, onSave } = props;


    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                setState({ ...state, [anchor]: open });
            };


    return (
        <Drawer
            elevation={1}
            sx={{
                display: 'flex', alignItems: 'center', justifyItems: 'center', '& .MuiDrawer-paper': {
                    transitionDuration: '6s', maxWidth: '400px',
                }
            }}
            anchor={anchor}
            open={open}
            onClose={toggleDrawer(anchor, false)}
        >
            <Box
                sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', padding: '30px' }}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <ConfigureField type={type} onCancel={onCancel} onSave={onSave} />
            </Box>
        </Drawer>



    );
}

