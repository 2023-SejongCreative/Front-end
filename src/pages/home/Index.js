import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../../api/Interceptors";
import ModalCreate from "../../components/ModalGroup";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "../../components/header/Header";
import SideBarAtHome from "../../components/SideBarAtHome";

const Index = () => {
  // const user_email = useSelector((state) => state.user.email);
  // // const navigate = useNavigate();
  // // const dispatch = useDispatch();

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
