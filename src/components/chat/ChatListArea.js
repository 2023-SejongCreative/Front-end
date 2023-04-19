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
import { useNavigate } from "react-router-dom";

export default function ChatListArea(props) {
  const navigate = useNavigate();
  const [color, setColor] = useState("white");

  const friend = "세종이";
  const friendSay = "이번 주에 뭐하고 놀거야?";

  const moveDMRoom = () => {
    localStorage.setItem("isChatDefault", false);

    navigate(`/chat/3`);
  };
  const MyListItem = styled(ListItem)`
    :hover {
      cursor: pointer;
    }
    background-color: ${color};
  `;
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
          <MyListItem
            alignItems="flex-start"
            // 클릭하면 dm id 넘겨주기
            onClick={() => moveDMRoom()}
          >
            <ListItemText primary={friend} secondary={friendSay} />
          </MyListItem>
          <Divider
            sx={{
              borderColor: "DarkGrey",
            }}
          />
        </List>
      </List>
    </>
  );
}
