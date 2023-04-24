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
import { TextField } from "@mui/material";
import { api } from "../../api/Interceptors";
import { useNavigate, useParams } from "react-router-dom";

const MyListItem = styled(ListItem)`
  &:hover {
    cursor: pointer;
  }
  &.selected {
    background-color: rgba(245, 182, 108, 0.2);
  }
`;
export default function ChatListArea(props) {
  const navigate = useNavigate();
  const { dm_id } = useParams();
  // const [chatList, setChatList] = useState();
  let chatList = [
    { id: 1, name: "채팅방1", lastChat: "오 진짜?" },
    { id: 2, name: "채팅방2", lastChat: "안될게 뭐 있어?" },
    { id: 3, name: "채팅방3", lastChat: "망해도 돼~" },
    { id: 4, name: "채팅방4", lastChat: "집착 노노" },
    { id: 5, name: "채팅방5", lastChat: "불안한게 당연한거여" },
    { id: 6, name: "채팅방6", lastChat: "나 잘해" },
    { id: 7, name: "채팅방7", lastChat: "괜찮당께" },
    { id: 8, name: "채팅방8", lastChat: "으갸갸갹" },
  ];

  useEffect(() => {
    // 페이지가 렌더링 될 때 채팅 목록 불러오기
    // api
    //   .get("/chat/chatlist")
    //   .then((response) => {
    //     localStorage.setItem("chatList", response.data);
    //     //response안 어디에 보내주는지 백엔드에 물어보고 수정할 것
    //     setChatList(response.data);
    //     console.log(response);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const moveDMRoom = (dmID, dmName) => {
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
                className={dm_id == v.id ? "selected" : ""}
              >
                <ListItemText primary={v.name} secondary={v.lastChat} />
              </MyListItem>
              <Divider
                sx={{
                  borderColor: "grey",
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
