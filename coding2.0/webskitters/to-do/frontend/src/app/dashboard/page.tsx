"use client";
import React, { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { LinearProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import LoadingWithBackdrop from "@/components/LoadingWithBackdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditSectionForm from "@/components/EditSectionForm";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from "@mui/material/Tooltip";
import {isMobileDevice} from "@/util/DeviceDetect";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useThemeMode } from "@/util/GetTheme";
import { User } from "@/interfaces/user.type";


const Dashboard = () => {

  const isMobile=isMobileDevice();
  const theme = useThemeMode();
  const [isProgress, setIsProgress] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const notify = (msg: string) => {
    toast.success(msg, {
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

  //get user details of current loged in user
  const getUserInfo = async () => {
    setIsProgress(true);
    try {
      const res = await fetchUserInfo();
      if (res) {
        const userData = await res.json();
        setIsProgress(false);
        setUser(userData);
        notify("welcome!");
      }
    } catch (err) {
      notifyError("sign-in first");
      if (err instanceof Error) {
        console.info("Error message:", err.message);
      }
      redirect("/sign-in");
    }
  };

  // const [webpaperApplicationData, setWebpaperApplicationData] = useState<WebpaperApplicationData | null>(null);
  const {webpaperApplicationData,setWebpaperApplicationData,deleteTopic,renameTopic}=webpaperStore();

  const getWebAppData = async (email: string) => {
    console.log(email);
    try {
      const res = await GetWebpaperApplicationData(email);
      if (res?.ok) {
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const webAppData = await res.json();
          console.log(webAppData);
          setWebpaperApplicationData(webAppData);

        } else {
          console.error("Response is not JSON or is empty");
        }
      } else {
        console.error(`Error: ${res?.status} ${res?.statusText}`);
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };


  // Fetch user info only after the component is mounted on the client
  useEffect(() => {
    if (!user) {
      async function fetchData() {
        await getUserInfo();
      }
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (user && !webpaperApplicationData) {
      getWebAppData(user.email);
    }
  }, [user]);


  //handling currectly selected topic (this is for showing user filtered data);
  const [selectedTopic, setSelectedTopic] = useState<{ topicId: number | null; sectionId: number | null }>({
    topicId: null,
    sectionId: null,
  });

  const updateSelectedTopic=(topicId:number|null,sectionId:number|null)=>{
    setSelectedTopic({topicId:topicId,sectionId: sectionId});
  }

  //handeling topic editing logic--
  const [isHoveringOnBreadcrumb, setIsHoveringOnBreadcrumb] = useState(false);
  const [isEditTopicFormOpen, setIsEditTopicFormOpen] = useState(false);
  const submitAndCloseForEditTopicForm = async (newTopicName: string) => {
    const newUpdateTopicPayload: UpdateTopicPayload = {
      userId: webpaperApplicationData?.id ?? 0,
      sectionId: selectedTopic.sectionId ?? 0,
      topicId: selectedTopic.topicId ?? 0,
      newTopicName: newTopicName
    }
    renameTopic(newUpdateTopicPayload);
    setIsEditTopicFormOpen(false);
    await rt(newUpdateTopicPayload);
  }
  const deleteAndCloseForEditTopicForm = async () => {
    deleteTopic(selectedTopic.sectionId ?? 0,selectedTopic.topicId ?? 0);
    setIsEditTopicFormOpen(false);
    if(selectedTopic.topicId) await dt(selectedTopic.topicId);
  }

  // If the `user` data is not available yet, show a loading state
  if (!user) {
    return <LoadingWithBackdrop></LoadingWithBackdrop>;
  }

  return (
    <div className="flex flex-col" style={{ width: "100%" }}>

      {webpaperApplicationData && (
        <Nav
          updateSelectedTopic={updateSelectedTopic}
        >
          <Box sx={{ width: "90%", height: "2rem", marginBottom: "1rem", marginLeft: "0.5rem",display: "flex", flexDirection: "row",gap:1,alignItems:"center" }}
               onMouseEnter={() => {
                 setIsHoveringOnBreadcrumb(true);
               }}
               onMouseLeave={() => {
                 setIsHoveringOnBreadcrumb(false);
               }}
          >
                <Typography width={"auto"}>
                  {
                    getBreadcrumb(webpaperApplicationData, selectedTopic.sectionId, selectedTopic.topicId)
                  }
                </Typography>
            {
              !isMobile && isHoveringOnBreadcrumb && selectedTopic.sectionId!=null &&
                <Tooltip title={`Edit topic name "${webpaperApplicationData.sections.find(sec=>sec.id==selectedTopic.sectionId)?.topics.find(t=>t.id==selectedTopic.topicId)?.label}" or delete `}>
                  <Button size={"small"} onClick={()=>{setIsEditTopicFormOpen(true)}}>
                    <EditIcon fontSize={"small"}/>
                  </Button>
                </Tooltip>
            }
            {
              isMobile && selectedTopic.sectionId!=null &&
                <Tooltip title={`Edit topic name "${webpaperApplicationData.sections.find(sec=>sec.id==selectedTopic.sectionId)?.topics.find(t=>t.id==selectedTopic.topicId)?.label}" or delete `}>
                  <Button size={"small"} onClick={()=>{setIsEditTopicFormOpen(true)}}>
                  <EditIcon fontSize={"small"}/>
                  </Button>
                </Tooltip>

            }


          </Box>


          <div>
            {isProgress && <LinearProgress></LinearProgress>}
            <div id="webpapers" style={{ display: "flex", flexDirection: "column", gap: 2,width:"100%" }}>

            {

              selectedTopic.topicId==null?webpaperApplicationData.inboxWebpapers?.slice().reverse()
                  .map((webpaper,index)=>{
                    const webpaperBelonging:{ topicId: number | null; sectionId: number | null, webpaperId:number|null }={
                      topicId:null,
                      sectionId:null,
                      webpaperId:webpaper.id,
                    }
                return <WebpaperCard
                    webpaper={webpaper}
                    key={index}
                    webpaperBelonging={webpaperBelonging}
                />;

              }):webpaperApplicationData.sections.find(item=>item.id==selectedTopic.sectionId)?.topics.find(item=>item.id==selectedTopic.topicId)?.webpapers?.slice()?.reverse().map((webpaper,index)=>{
                const webpaperBelonging:{ topicId: number | null; sectionId: number | null,webpaperId:number|null  }={
                  topicId:selectedTopic.topicId,
                  sectionId:selectedTopic.sectionId,
                  webpaperId:webpaper.id,
                }
                return <WebpaperCard
                    webpaper={webpaper}
                    key={index}
                    webpaperBelonging={webpaperBelonging}
                />
              })

            }
            <Divider sx={{margin:2}}/>
              {
                  selectedTopic.topicId == null &&
                  webpaperApplicationData.sections.map(section =>
                      section?.topics?.map(topic =>
                          topic?.webpapers?.map(webpaper => {
                            const webpaperBelonging = {
                              topicId: topic.id,
                              sectionId: section.id,
                              webpaperId:webpaper.id,
                            };

                            return (
                                <WebpaperCard
                                    webpaper={webpaper}
                                    key={webpaper.id}
                                    webpaperBelonging={webpaperBelonging}

                                />
                            );
                          })
                      )
                  )
              }
            </div>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={`${theme.palette.mode}`}
              transition={Bounce}
            />
          </div>
        </Nav>
      )}
      {
        webpaperApplicationData &&
          <EditSectionForm
        open={isEditTopicFormOpen}
        setOpen={setIsEditTopicFormOpen}
        dialogTitle={"Edit this Topic"}
        dialogContentText={"Edit or delete this topic"}
        submitAndClose={submitAndCloseForEditTopicForm}
        deleteAndClose={deleteAndCloseForEditTopicForm}
        placeholder={webpaperApplicationData.sections.find(sec=>sec.id==selectedTopic.sectionId)?.topics.find(t=>t.id==selectedTopic.topicId)?.label}
        ></EditSectionForm>
      }
    </div>
  );
};

export default Dashboard;
