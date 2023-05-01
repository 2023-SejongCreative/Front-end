import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import { Box, Divider, Grid, Toolbar, Typography } from "@mui/material";
import SideBarAtHome from "../../components/sidebar/SideBarAtHome";
import ModalDmCreate from "../../components/chat/ModalDmCreate";
import { useParams } from "react-router-dom";
import ChatListArea from "../../components/chat/ChatListArea";
import * as StompJs from "@stomp/stompjs";
import InDM from "../../components/chat/InDM";
import { api } from "../../api/Interceptors";

const ChatPage = () => {
  const [dmName, setDmName] = useState("");
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    // 테스트 get요청
    // console.log("테스트!");
    // api
    //   .get("/ch")
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Header />
        <SideBarAtHome />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />

          <Grid container alignItems="center">
            <ChatListArea />
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: "DarkGrey",
              }}
            />
            {/* <Typography align="center" margin="auto">
                <h3>채팅방을 선택하세요</h3>
              </Typography> */}
            {/* 선택된 채팅방 내용 */}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default ChatPage;
