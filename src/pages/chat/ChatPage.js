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
  const [dmId, setDmId] = useState("");
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    //페이지가 렌더링 될 때 채팅 목록 불러오기
    api
      .get("/chat/chatlist")
      .then((response) => {
        localStorage.setItem("chatList", response);
        //response안 어디에 보내주는지 백엔드에 물어보고 수정할 것
        setChatList(response);
        console.log(response);
      })
      .catch((err) => console.log(err));
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
            <ChatListArea chatList={chatList} />
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
            <InDM dmId={dmId} dmName={dmName} />
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default ChatPage;
