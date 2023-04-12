import React from "react";
import Header from "../../components/header/Header";
import SideBarAtRoom from "../../components/SideBarAtRoom";
import ModalRoom from "../../components/ModalRoom";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
const Room = () => {
  const { room_id } = useParams();
  const location = useLocation();
  const room_name = location.state.room_name;
  const rooms = location.state.rooms;
  const group_id = location.state.group_id;
  const groups = location.state.groups;
  const groupNames = location.state.groupNames;
  console.log("룸 아이디 : ", room_id);
  console.log(groupNames);
  return (
    <div>
      <Header />
      <SideBarAtRoom
        room_name={room_name}
        // room_id={room_id}
        rooms={rooms}
        group_id={group_id}
        groups={groups}
        groupNames={groupNames}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />룸 {room_id}
      </Box>
    </div>
  );
};

export default Room;
