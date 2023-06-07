import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalCreate from "../ModalGroup";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/Interceptors";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { groupSlice } from "../../store/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import Myspace from "../Myspace";

export const MyTitle = styled.h1`
  /* margin */
  margin: 8px;
  padding: 8px;
  font-weight: bold;
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const user_email = localStorage.getItem("email");
  const [groupNames, setGroupNames] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user_email);
    api
      .get(`/${user_email}/groups`)
      // .get(`/groups`)
      .then((response) => {
        console.log(response);
        setGroups([]);
        setGroups(response.data.groups);
        // setGroups(response.data);
        response.data.groups.forEach((v) => {
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
        localStorage.setItem("isLogined", false);
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
    window.location.reload();
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
        {/* <List
          component="nav"
          aria-label="Device settings"
          sx={{ bgcolor: "background.paper" }}
        >
          <ListItem
            button
            aria-haspopup="listbox"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText secondary={groupNames[selectedIndex]} />
          </ListItem>
        </List>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            role: "listbox",
          }}
        >
          {groupNames.map((text, index) => (
            <ListItem onClick={() => moveGroupPage(text)}>
              <MenuItem
                key={text}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {text}
              </MenuItem>
            </ListItem>
          ))}
        </Menu> */}
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
