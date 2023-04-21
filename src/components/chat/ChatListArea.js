import * as React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ModalDmCreate from "./ModalDmCreate";
import styled from "styled-components";
import InDM from "./InDM";
import { api } from "../../api/Interceptors";
import { useNavigate } from "react-router-dom";

const MyListItem = styled(ListItem)`
  :hover {
    cursor: pointer;
  }
`;

export default function ChatListArea() {
  const navigate = useNavigate();
  const [color, setColor] = useState("white");
  const [chatList, setChatList] = useState();

  const friend = "세종이";
  const friendSay = "이번 주에 뭐하고 놀거야?";

  useEffect(() => {
    //페이지가 렌더링 될 때 채팅 목록 불러오기
    api
      .get("/chat/chatlist")
      .then((response) => {
        localStorage.setItem("chatList", response.data);
        //response안 어디에 보내주는지 백엔드에 물어보고 수정할 것
        setChatList(response.data);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const moveDMRoom = (dmID, dmName) => {
    //  let dmName
    localStorage.setItem("isChatDefault", false);
    // chatList.forEach((v, i) => {
    //   if (v.id === dmID) dmName = v.name;
    // });
    navigate(`/chat/${dmID}`, {
      state: { chatList: chatList, dmID: dmID, dmName: dmName },
    });
  };

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}>
        <ModalDmCreate />
        {/* <Divider
          sx={{
            borderColor: "DarkGrey",
          }}
        /> */}

        {/* 채팅 리스트들 나열 시작 */}
        <List>
          {chatList.map((v, i) => (
            <List>
              <MyListItem
                alignItems="flex-start"
                // 클릭하면 dm id 넘겨주기
                onClick={() => moveDMRoom(v.id, v.name)}
              >
                <ListItemText primary={v.name} secondary={v.lastChat} />
              </MyListItem>
              <Divider
                sx={{
                  borderColor: "DarkGrey",
                }}
              />
            </List>
          ))}
        </List>
      </List>
      {/* 이렇게 안 하고 dmDetail페이지를 만들어서 페이지 이동? */}
      {/* <InDM /> */}
    </>
  );
}
