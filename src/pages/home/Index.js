import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../../api/Interceptors";
import ModalCreate from "../../components/ModalGroup";
import { userSlice } from "../../store/userSlice";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "../../components/header/Header";
import SideBarAtHome from "../../components/SideBarAtHome";

const Index = () => {
  const user_email = localStorage.getItem("email");
  console.log(user_email);
  const location = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  useEffect(() => {
    let isLogined = localStorage.getItem("isLogined");
    console.log(isLogined);
    if (!isLogined) navigate("/login");
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <SideBarAtHome />
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
