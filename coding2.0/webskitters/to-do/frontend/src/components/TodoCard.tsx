import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FadeMenu from './FadeMenu';
import Box from '@mui/material/Box';
import { useState } from "react";
import MoveTodoForm from './MoveTotoForm';
import DeleteTodoConfirmationForm from './DeleteTodoConfirmationForm';
import { DeleteTodo } from '@/services/TodoService';
import { Todo } from '@/interfaces/todo.type';

export default function TodoCard(props: {
    todo: Todo;
   
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screens
    const [isMoveFormOpen, setIsMoveFormOpen] = useState(false);
    const [isDeleteConfirmationFormOpen, setIsDeleteConfirmationMoveFormOpen] = useState(false);
    //handelling delete by function
    const handelDelete = async () => {
        DeleteTodo(props.todo);

    }

    return (
        <Card
            sx={{
                position: "relative",  // Needed for absolute positioning of menu
                display: "flex",
                width: "100%",
                maxWidth: isMobile ? "100%" : "200vh",
                height: isMobile ? "9rem" : "13rem",
                alignItems: "center",
                justifyContent: "space-between",
                padding: isMobile ? 1 : 2,
                margin: "0 auto",
                boxShadow: 3,
            }}
        >

            {/* FadeMenu positioned at top-right */}
            <Box
                sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    zIndex: 10, // Ensure it's above other elements
                }}

            >
                <FadeMenu menulist={["Move", "Delete"]}  setIsMoveFormOpen={setIsMoveFormOpen} setIsDeleteConfirmationMoveFormOpen={setIsDeleteConfirmationMoveFormOpen} />
            </Box>

            <CardMedia
                sx={{
                    minWidth: isMobile ? "100px" : "10rem",
                    height: isMobile ? "100px" : "7rem",
                    objectFit: "cover",
                    backgroundColor: "#ddd",
                }}
                image={"https://via.placeholder.com/150"}
                title="Media"
            />

            <CardContent
                sx={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    gap: 1,
                    padding: isMobile ? 1 : 2,
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    gutterBottom
                    component="div"
                    fontSize={isMobile ? "10px" : "1.5rem"}
                    fontWeight="bold"
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        minWidth:"80%",
                        maxWidth: "85%",
                    }}
                >
                    {/* {props.todo.title} */}
                    {"The Todo"}
                </Typography>

                {/* <Typography
                    fontSize={isMobile ? "7px" : "1rem"}
                    color="text.secondary"
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        maxHeight: "4rem",
                        lineHeight: 1,
                        minWidth:"80%",
                        maxWidth: "85%",
                    }}
                >
                    {props.webpaper.description}
                </Typography> */}

                <CardActions
                    sx={{
                        display: "flex",
                        gap: isMobile ? 1 : 2,
                    }}
                >
                    <Button
                        sx={{
                            width: isMobile ? "20px" : "150px",
                            height: isMobile ? "20px" : "40px",
                            fontSize: isMobile ? "7px" : "1rem",
                            padding: isMobile ? "2px 4px" : "8px 16px",
                            textTransform: "lowercase",
                        }}
                        variant="outlined"
                    >
                        Summarize
                        <AutoAwesomeIcon
                            sx={{
                                marginLeft: "0.5rem",
                                fontSize: isMobile ? "10px" : "17px",
                            }}
                        />
                    </Button>

                    {/* <Button
                        sx={{
                            width: isMobile ? "20px" : "150px",
                            height: isMobile ? "20px" : "40px",
                            fontSize: isMobile ? "7px" : "1rem",
                            padding: isMobile ? "2px 4px" : "8px 16px",
                            textTransform: "lowercase",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#0069d9" },
                            "&:active": { backgroundColor: "#0062cc" },
                        }}
                        variant="contained"
                        onClick={() => { window.open(props.webpaper.link, "_blank"); }}
                    >
                        Link
                        <OpenInNewIcon
                            sx={{
                                marginLeft: "0.5rem",
                                fontSize: isMobile ? "10px" : "17px",
                            }}
                        />
                    </Button> */}

                </CardActions>

            </CardContent>
            <MoveTodoForm 
                open={isMoveFormOpen} 
                setOpen={setIsMoveFormOpen}
                // todoId={props.todo.id}
                // todoTitle={props.todo.title}
                todoId='1'
                todoTitle='1st todo'
                dialogContentText={"Move WebPaper From"} 
                dialogTitle={"Move Webpaper"}
            />
            <DeleteTodoConfirmationForm open={isDeleteConfirmationFormOpen} setOpen={setIsDeleteConfirmationMoveFormOpen} submitAndClose={handelDelete}/>
        </Card>
    );
}
