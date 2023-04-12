import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/Interceptors";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { groupSlice } from "../store/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalInviteRoom from "./ModalInviteRoom";
import Myspace from "./Myspace";

export const MyTitle = styled.h1`
  margin: 0;
  padding: 8px;
  text-align: center;
  cursor: pointer;
`;
const BtnWrapper = styled.div`
  text-align: center;
`;

const DeleteBtn = styled.div`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: #f5b66c;
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  align-items: center;
  :hover {
    cursor: pointer;
  }
  padding-top: 10px;
  margin-top: 10px;
`;
const LogoutBtn = styled.button`
  width: 200px;
  height: 50px;
  border: solid 1px #f5b66c;
  background-color: white;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  :hover {
    cursor: pointer;
  }
  margin-top: 10px;
`;
const drawerWidth = 240;
let roomName = [];
const SideBarRoom = (props) => {
  const { room_id } = useParams();
  const { room_name, rooms, group_id, groups, groupNames } = props;

  const [roomNames, setRoomNames] = useState([]);
  const user_email = useSelector((state) => state.user.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(rooms);

  useEffect(() => {
    rooms.forEach((v) => {
      roomName.push(v["room_name"]);
    });
    setRoomNames(roomName);
  }, []);

  const DeleteRoom = async () => {
    if (window.confirm(`${room_name} 룸을 삭제하시겠습니까?`)) {
      await api
        .delete(`/${room_id}/deleteroom`)
        .then((response) => {
          console.log(response);
          if (response.status === 200) alert("룸 삭제가 완료되었습니다.");
          else alert("관리자가 아닙니다!");
        })
        .catch((err) => console.log(err));
    } else {
      alert("룸 삭제를 취소하셨습니다.");
    }
  };

  const Logout = () => {
    api
      .post(
        "/",
        {},
        {
          headers: {
            access_token: localStorage.getItem("jwt_accessToken"),
            refresh_token: localStorage.getItem("jwt_refreshToken"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.removeItem("jwt_accessToken");
        localStorage.removeItem("jwt_refreshToken");
        localStorage.setItem("isAuth", false);
        alert("로그아웃 성공! 다음에 또 만나요❤️");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  const moveGroupPage = async (text) => {
    let group_id = groups[groupNames.indexOf(text)].group_id;
    navigate(`/group/${group_id}`, {
      state: { groups: groups, group_name: text, groupNames: groupNames },
    });
  };
  const moveRoomPage = async (text) => {
    let room_id = rooms[roomNames.indexOf(text)].room_id;
    navigate(`/room/${room_id}`, {
      state: {
        rooms: rooms,
        room_name: text,
        group_id: group_id,
        groups: groups,
        groupNames: groupNames,
      },
    });
  };
  // const group_id = useSelector((state) => state.list.groupList);
  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <MyTitle>waffle</MyTitle>
        <Divider />
        {/* <Myspace /> */}
        {console.log(groupNames)}
        {groupNames.map((text, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={() => moveGroupPage(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <List>
          <div onClick={() => navigate(`/room/${room_id}`)}>{room_name}</div>
          {roomNames.map((text, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => moveRoomPage(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <BtnWrapper>
          <ModalInviteRoom room_id={room_id} />
          <DeleteBtn onClick={DeleteRoom}>-&nbsp;Room Delete</DeleteBtn>
          <LogoutBtn onClick={Logout}>Logout</LogoutBtn>
        </BtnWrapper>
      </Drawer>
    </div>
  );
};

export default SideBarRoom;
