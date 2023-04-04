import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../api/Interceptors";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { MyToolbar, HeaderBtn, MyTitle } from "./style";

const drawerWidth = 240;
const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async () => {
      const userData = await axios
        .get("/", {
          headers: {
            Authorization: localStorage.getItem("jwt_accessToken"),
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    };
  }, []);

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
        localStorage.setItem("isAuthorized", false);
        alert("로그아웃 성공! 다음에 또 만나요❤️");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <MyToolbar>
          <HeaderBtn>일정</HeaderBtn>
          <HeaderBtn>프로필</HeaderBtn>
          <HeaderBtn>채팅</HeaderBtn>
        </MyToolbar>
      </AppBar>
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

        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}

          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <button onClick={Logout}>Logout</button>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />

        {/* <div>{this.userData}</div> */}
      </Box>
    </Box>
  );
};

export default Index;
