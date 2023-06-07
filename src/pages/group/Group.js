import React from "react";
import Header from "../../components/header/Header";
import SideBarAtGroup from "../../components/sidebar/SideBarAtGroup";
import ModalRoom from "../../components/ModalRoom";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
const Group = () => {
  const { group_id } = useParams();
  const location = useLocation();
  const group_name = location.state.group_name;
  const groups = location.state.groups;
  const groupNames = location.state.groupNames;
  // console.log(groups);
  // console.log(group_name);
  // console.log("그룹 페이지 별 그룹 아이디 : ", group_id);
  return (
    <div>
      <Header />
      <SideBarAtGroup
        group_id={group_id}
        group_name={group_name}
        groups={groups}
        groupNames={groupNames}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        그룹 {group_id}
      </Box>
    </div>
  );
};

export default Group;
