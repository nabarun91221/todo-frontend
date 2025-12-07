import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { isMobileDevice } from "@/util/DeviceDetect";
import { logOutUser } from "@/services/UserService";
import { redirect } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import generateMutedColor from "@/util/GenerateRandomColor";
import SyncIcon from "@mui/icons-material/Sync";
import CreationForm from "./CreateTodoForm";
import { useAuth } from "@/store/userAuth";
// import {
//     CreateSectionPayload, CreateTopicPayload, CreateWebpaperPayload, Section, UpdateSectionPayload, Webpaper,
//     WebpaperApplicationData,
// } from "@/Types/WebpaperApplicationData";

import { CreateTodo,CreateSection,DeleteSection } from "@/services/TodoService";


import { CreateTodoPayload } from "@/interfaces/payload.types/CreateTodoPayload";
import { CreateSectionPayload } from "@/interfaces/payload.types/CreateSectionPayload";

import {useState } from "react";


import {blueGrey} from "@mui/material/colors";
import {CircularProgress} from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditIcon from '@mui/icons-material/Edit';
import EditSectionForm from "@/components/EditSectionForm";
import { User } from "@/interfaces/user.type";
const drawerWidth = 240;

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const GetTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          text: {
            primary: prefersDarkMode ? "#FFFFFF" : "#000000", //white:black
            secondary: "#666666",
            disabled: "#999999",
          },
        },
      }),
    [prefersDarkMode]
  );
  return theme;
};

export default function Nav(props: {
  children: React.ReactNode; // For nested components
    updateSelectedTopic: (topicId:number|null,sectionId:number|null) => void;
}) {
  const theme = GetTheme();
  const isMobile = isMobileDevice();
  const notifyError = (msg: string) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${theme.palette.mode}`,
      transition: Bounce,
    });
  };

  //logout
    const [isLogingOut, setIsLogingOut] = useState(false);
  const logOut = async () => {
      setIsLogingOut(true);
    const res = await logOutUser();
    if (res.ok) {
      redirect("/");
    } else {
      notifyError("something went wrong" + `${res.status}`);
    }
    setIsLogingOut(false);
  };

  // State for drawer open/close
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  // State for managing open/close status of each folder
  const { user: User } =useAuth();
    const [openStates, setOpenStates] = React.useState(
        () =>
            user?.sections
                ? Object.fromEntries(user.sections.map((item) => [item.sectionName, true]))
                : {}
    );

  //State for managing show/notshow the delete icon of each folder
    const [isDeleteShow, setIsDeleteShow] = React.useState(
        () =>
            user?.sections
                ? Object.fromEntries(webpaperApplicationData.sections.map((item) => [item.sectionName, false]))
                : {}
    );
  // Toggle function for each folder
  const handleToggleFolder = (folder: string) => {
    setOpenStates((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };


  // Toggle the drawer
  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };




  //creating section creation function
    const [isSectionCreationFormOpen, setIsSectionCreationFormOpen] = useState(false);
    const {addSection,addTopic,deleteSection,renameSection} =useWebpaperStore();
  const handleCreateSec = async (sectionName: string) => {
      if(webpaperApplicationData){
          const sectionData:CreateSectionPayload={
              userId:webpaperApplicationData?.id,
              sectionName:sectionName
          }
          //calling backend api to add a section to database;
          const resSection:void | Section=await createSection(sectionData)
          if(resSection==undefined) return"response is undefined";
          //updating local state;
          if(resSection) addSection(resSection);
          setIsSectionCreationFormOpen(false);
      }



  }
  //creating Topic creation function
    const [isTopicCreationFormOpen, setIsTopicCreationFormOpen] = useState(false);
  const [creatingTopicAtSectionId,setCreatingTopicAtSectionId]=useState<number>(0);
  const handleCreateTopic = async (name: string) => {
     const topicData:CreateTopicPayload={
         sectionId:creatingTopicAtSectionId,
         topicName:name,
         iconColor:generateMutedColor(),
     }
     //calling backend api to add topic
     const resTopic=await createTopic(topicData);
     if(resTopic==undefined) return"response is undefined";
     console.log(resTopic);
     //updating local state;
      if(resTopic) addTopic({sectionId:topicData.sectionId,topic:resTopic});
     setIsTopicCreationFormOpen(false);
     // handleToggleFolder(resTopic.sectionName);
  }

  //creating webpaper
    const {setWebpaperApplicationData} =useWebpaperStore();
    const [isWebpaperCreationFormOpen, setIsWebpaperCreationFormOpen] = useState(false);
  const handleWebpaperCreation = async (webPaperUrl: string) => {
      if(!webpaperApplicationData?.id) return;
      const newCreateWebpaperPayload:CreateWebpaperPayload={
          userId: webpaperApplicationData?.id,
          webPaperUrl: webPaperUrl,
      }
      const res:WebpaperApplicationData=await createWebpaper(newCreateWebpaperPayload);
      setWebpaperApplicationData(res);// Update with a new object reference
      setIsWebpaperCreationFormOpen(false);
  }

  //edit section
    const [isEditSectionFormOpen, setIsEditSectionFormOpen] = useState(false);


    return (
    <Box sx={{ display: "flex" ,width:"100%"}}>
      <ThemeProvider theme={theme}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[2],
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Image
              className="dark:invert"
              src="/webpaper_logo.png"
              alt="WebPaper Logo"
              width={120}
              height={38}
              priority
            />
          </Toolbar>
            <Toolbar>
                <Tooltip title={"add a webPaper"}>
                    <Button onClick={()=>setIsWebpaperCreationFormOpen(true)}>
                <PostAddIcon></PostAddIcon>
                    </Button>
                </Tooltip>
            </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              paddingTop: 8,
            },
          }}
        >
          <FireNav component="nav" disablePadding>
            <Divider />
            <ListItemButton
              sx={[
                {
                  height: 60,
                  display: "flex",
                  justifyContent: "space-between",
                },
                {
                  ":hover": { backgroundColor: "transparent" },
                },
              ]}
            >
              <ListItemIcon sx={{ fontSize: 30 }}>
                <AccountCircleIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={webpaperApplicationData?.username}
                sx={{
                  color: "primary",
                  fontWeight: "medium",
                  variant: "body2",
                  textWrap: "wrap",
                  overflow: "hidden",
                }}
              />
              <Tooltip title={"logout"}>
                <IconButton size="small" onClick={logOut}>
                    {isLogingOut? <CircularProgress size={20} sx={{color:"inherit"}} />:<LogoutIcon fontSize="small" />}

                </IconButton>
              </Tooltip>
            </ListItemButton>
            <Divider />

            <Box
              sx={{
                height: 35,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                sx={{
                  margin: 0,
                  borderRadius: 0,
                }}
                onClick={() => {
                    setIsSectionCreationFormOpen(true);
                }}
              >
                <AddIcon></AddIcon>{" "}
                <Typography
                  sx={{ fontSize: 13, marginTop: 0.2, marginLeft: 1 }}
                >
                  {`create section`}
                </Typography>
              </Button>

              <SyncIcon sx={{ marginRight: 1 }}></SyncIcon>
            </Box>
            <Divider />
            <ListItemButton
              sx={{
                height: "auto",
                width: "100%",
              }}
              onClick={() => {
                  props.updateSelectedTopic(null,null);
              }}
            >
              <ListItemIcon>
                <SnippetFolderIcon
                  sx={{
                    color: blueGrey ,
                  }}
                />
              </ListItemIcon>
              <Typography>Inbox</Typography>
            </ListItemButton>

            <Divider />
            {webpaperApplicationData?.sections?.map((section) => {
              const isOpen = openStates[section.sectionName];

              return (
                <Box
                  key={section.sectionName}
                  sx={
                    isOpen
                      ? {
                          bgcolor: "rgba(71, 98, 130, 0.2)",
                          paddingBottom: 2,
                        }
                      : {}
                  }

                >
                  <ListItemButton
                    onClick={() => handleToggleFolder(section.sectionName)}
                    onMouseEnter={() => {
                        setIsDeleteShow((prev) => ({
                            ...prev,
                            [section.sectionName]: true
                        }));
                    }}
                    onMouseLeave={() => {
                        setIsDeleteShow((prev) => ({
                            ...prev,
                            [section.sectionName]: false
                        }));
                    }}
                    sx={{ position: "relative", overflow: "visible" }}
                  >
                    <ListItemText
                      primary={section.sectionName}
                      primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: "medium",
                      }}
                    />

                    <KeyboardArrowDown
                      sx={{
                        transform: isOpen ? "rotate(-180deg)" : "rotate(0)",
                        transition: "0.2s",
                      }}
                    />
                    <Tooltip title={`Add a topic to ${section.sectionName}`}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setCreatingTopicAtSectionId(section.id);
                          setIsTopicCreationFormOpen(true);
                        }}
                        size="small"
                        sx={{ marginLeft: "1rem"}}

                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                      {isDeleteShow[section.sectionName] && !isMobile && (
                          <Box
                              sx={{
                                  position: "absolute",
                                  right: 0,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  boxShadow: 3,
                                  borderRadius: 1,
                                  zIndex: 10,
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "2px",
                              }}
                              onClick={(e) => {
                                  e.stopPropagation();
                                  setCreatingTopicAtSectionId(section.id);
                                  setIsEditSectionFormOpen(true);
                              }}
                          >
                              <Tooltip title="Edit this section">
                                      <EditIcon fontSize="small" sx={{ color: "inherit" }} />
                              </Tooltip>
                          </Box>
                      )}
                      {
                          isMobile && (<Box
                              sx={{
                                  position: "absolute",
                                  right: 0,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  boxShadow: 3,
                                  borderRadius: 1,
                                  zIndex: 10,
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "2px",
                              }}
                              onClick={(e) => {
                                  e.stopPropagation();
                                  setCreatingTopicAtSectionId(section.id);
                                  setIsEditSectionFormOpen(true);
                              }}
                          >
                              <Tooltip title="Edit this section">
                                  <EditIcon fontSize="small" sx={{ color: "inherit" }} />
                              </Tooltip>
                          </Box>)
                      }

                  </ListItemButton>
                  {isOpen &&
                    section?.topics?.map((topic) => (
                      <ListItemButton
                        key={topic.id}
                        onClick={
                          isMobile ? ()=>{
                              props.updateSelectedTopic(topic.id,section.id);
                              handleDrawerToggle()
                          } : () => {
                              props.updateSelectedTopic(topic.id,section.id);
                          }
                      } //
                        sx={{
                          py: 0,
                          pl: 4,
                          color: "text.primary",
                        }}
                      >
                        <Divider />
                        <ListItemIcon>
                          <SnippetFolderIcon
                            sx={{
                              color:
                                topic.iconColor != ""
                                  ? topic.iconColor
                                  : generateMutedColor(),
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={topic.label}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: "medium",
                          }}
                        />
                          {/*<Tooltip title={"Delete topic"}>*/}
                          {/*    <RemoveCircleOutlineIcon sx={{ fontSize: "small", color: "red" }} />*/}
                          {/*</Tooltip>*/}
                      </ListItemButton>
                    ))}
                </Box>
              );
            })}
          </FireNav>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
            marginLeft: drawerOpen ? `${drawerWidth}px` : "0px",
            transition: theme.transitions.create(["width", "margin-left"], {
              duration: theme.transitions.duration.standard,
            }),
          }}
        >
          <Toolbar />
          <>{props.children}</>
        </Box>
      </ThemeProvider>
      <CreationForm
        open={isSectionCreationFormOpen}
        setOpen={setIsSectionCreationFormOpen}
        submitAndClose={handleCreateSec}
        dialogTitle={"Create Section"}
        dialogContentText={"Enter Section Name:"}
        placeholder={"Name"}
      ></CreationForm>
        <CreationForm
            open={isTopicCreationFormOpen}
            setOpen={setIsTopicCreationFormOpen}
            submitAndClose={handleCreateTopic}
            dialogTitle={"Create Topic"}
            dialogContentText={"Enter Topic Name:"}
            placeholder={"Name"}
        ></CreationForm>
        <CreationForm
            open={isWebpaperCreationFormOpen}
            setOpen={setIsWebpaperCreationFormOpen}
            submitAndClose={handleWebpaperCreation}
            dialogTitle={"Create WebPaper"}
            dialogContentText={"Enter Web-Url:"}
            placeholder={"url"}
        ></CreationForm>
       <EditSectionForm
           open={isEditSectionFormOpen}
           setOpen={setIsEditSectionFormOpen}
           submitAndClose={(newSectionName)=>{
               const newUpdateSectionPayload: UpdateSectionPayload = {
                   userId: webpaperApplicationData?.id ?? 0,
                   sectionId: creatingTopicAtSectionId ,
                   newSectionName: newSectionName,
               }
               renameSection(newUpdateSectionPayload)
               setIsEditSectionFormOpen(false);
               rs(newUpdateSectionPayload);

           }}
           deleteAndClose={async ()=>{
               deleteSection(creatingTopicAtSectionId);
               setIsEditSectionFormOpen(false);
               await ds(creatingTopicAtSectionId);
           }}

           dialogContentText={"Edit or Delete Section"}
           dialogTitle={"Edit section"}
           placeholder={webpaperApplicationData?.sections?.find(sec => sec.id === creatingTopicAtSectionId)?.sectionName ?? ''}
       ></EditSectionForm>

    </Box>
  );
}
