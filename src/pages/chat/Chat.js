import React from "react";
import Header from "../../components/header/Header";
import { Box, Divider, Grid, Toolbar } from "@mui/material";
import SideBarAtHome from "../../components/sidebar/SideBarAtHome";
import { MessageInput } from "../../components/chat/MessageInput";
import { useRef, useState } from "react";
const Chat = () => {
  const client = useRef({});

  const [chatMessageList, setChatMessageList] = useState([]);
  const [dmName, setDmName] = useState("");
  const [dmId, setDmId] = useState("");
  const [chatName, setChatName] = useState("");
  const [open, setOpen] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [chatMessage, setChatMessage] = useState();

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
          <h1>채팅 페이지 어려워여</h1>
          <Grid container alignItems="center">
            에베베
            <Divider orientation="vertical" flexItem />
            에베베
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Chat;
