import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Dispatch, SetStateAction} from "react";


export default function FadeMenu(props: {
    menulist: string[];
    setIsMoveFormOpen: Dispatch<SetStateAction<boolean>>;
    setIsDeleteConfirmationMoveFormOpen: Dispatch<SetStateAction<boolean>>;

}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (option:string) => {
        if(option=="Move"){
            props.setIsMoveFormOpen(true);
        }
        if(option=="Delete"){
            props.setIsDeleteConfirmationMoveFormOpen(true);
        }
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    borderRadius: "50%",
                    width: isMobile ? "35px" : "45px", // Smaller on mobile
                    height: isMobile ? "35px" : "45px",
                    minWidth: "0",
                    padding: isMobile ? "5px" : "8px", // Adjust padding for touch targets
                }}
            >
                <MoreVertIcon fontSize={isMobile ? "small" : "medium"} />
            </Button>

            <Menu
                id="fade-menu"
                MenuListProps={{ 'aria-labelledby': 'fade-button' }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: isMobile ? "bottom" : "top", // Adjust position for mobile
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {props.menulist.map((item) => (
                    <MenuItem
                        key={item}
                        onClick={()=>handleClose(item)}
                        sx={{ fontSize: isMobile ? "0.8rem" : "1rem", padding: isMobile ? "6px 12px" : "8px 16px" }}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
