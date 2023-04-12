import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalCreate from "./ModalGroup";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/Interceptors";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { groupSlice } from "../store/groupSlice";
import { useDispatch, useSelector } from "react-redux";
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
  border-radius: 10px;
  border: solid 1px #f5b66c;
  background-color: white;
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  :hover {
    cursor: pointer;
  }
  margin-top: 10px;
`;
const drawerWidth = 240;
let groupName = [];
const SideBar = (props) => {
  const user_email = useSelector((state) => state.user.email);
  const [groupNames, setGroupNames] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    api
      // .get(`/${user_email}/groups`)
      .get(`/groups`)
      .then((response) => {
        console.log(response);
        // setGroups(response.data.groups);
        setGroups(response.data);
        response.data.forEach((v) => {
          groupName.push(v["group_name"]);
        });
        setGroupNames(groupName);
      })
      //
      .catch((err) => console.log(err));
  }, []);

  console.log(groupNames);
  console.log(groups);
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
    console.log(text);
    let group_id = groups[groupNames.indexOf(text)].group_id;
    console.log(group_id);
    navigate(`/group/${group_id}`, {
      state: { group_name: text, groups: groups, groupNames: groupNames },
    });
  };

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
        <MyTitle onClick={() => navigate("/")}>waffle</MyTitle>
        <Divider />
        {/* <Myspace /> */}

        <List>
          {groupNames.map((text, index) => (
            <ListItem
              key={index}
              onClick={() => {
                moveGroupPage(text);
              }}
            >
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <ModalCreate />
        <BtnWrapper>
          {" "}
          <LogoutBtn onClick={Logout}>Logout</LogoutBtn>
        </BtnWrapper>
      </Drawer>
    </div>
  );
};

export default SideBar;
