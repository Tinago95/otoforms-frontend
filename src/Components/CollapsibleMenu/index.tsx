import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, Collapse, List, ListSubheader, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import * as nanoid from 'nanoid';

export interface NavItemProps {
    label: string;
    icon: React.ElementType;
    color: string;
    link: string;
    show: boolean;
    children: NavItemProps[];
    parent: boolean
}


interface NavListProps {
    navItems: NavItemProps[];
}
export function NavList(props: NavListProps) {
    console.log(props)
    const [open, setOpen] = React.useState(false);

    return (
        <>
            {
                props.navItems.map((item, index) => (<NavItem
                    key={index}
                    label={item.label}
                    icon={item.icon}
                    color={item.color}
                    link={item.link}
                    show={item.show}
                    children={item.children}
                    parent={item.parent}
                />))}
        </>
    );
}

export function NavItem(props: NavItemProps) {
    const [open, setOpen] = React.useState(false);
    const randomUUID = nanoid.customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 18)
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Link
                key={randomUUID()}
                id={props.label}
                to={props.link}
                style={
                    location.pathname.includes(props.link)
                        ? {
                            display: "block",
                            backgroundColor: '#6564DB18',
                            color: "#6564DB",
                            textDecoration: "inherit",

                            // borderRadius: props.parent ? "0px" : "0px",
                        }
                        : {
                            display: "block",
                            color: "white",
                            textDecoration: "inherit",

                            // borderRadius: props.parent ? "10px" : "0px",
                        }
                }
            >
                <ListItem onClick={handleClick} key={props.label} disablePadding>
                    <ListItemButton
                        sx={{
                            minHeight: 50,
                            justifyContent: true ? "initial" : "center",
                            px: 2.5,
                            borderRadius: "10px",
                        }}

                    >
                        <ListItemIcon
                            sx={{
                                fontSize: "20px",
                                minWidth: 0,
                                marginLeft: "5px",
                                mr: true ? 3 : "auto",
                                justifyContent: "center",
                                color: location.pathname.endsWith(props.link) ? "#fcb900" : props.color,
                            }}
                        >
                            <props.icon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body1"
                                    fontSize={"15px"}
                                    style={{
                                        lineHeight: "1",
                                        fontWeight: location.pathname.includes(props.link) ? "bold" : "normal",

                                        color: location.pathname.includes(props.link) ? "#fcb900" : props.color,
                                    }}
                                >
                                    {props.label}

                                </Typography>
                            }
                            sx={{ opacity: true ? 1 : 0, fontWeight: 500 }}
                        />
                    </ListItemButton>
                    {/* {props.children.length > 0 ? open ? <ExpandLess color='warning' sx={{ fontSize: '13px' }} /> : <ExpandMore color='warning' sx={{ fontSize: '14px' }} /> : undefined} */}

                </ListItem>

            </Link>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div  >
                    <NavList navItems={props.children} />
                </div>
            </Collapse>
        </>

    );
}