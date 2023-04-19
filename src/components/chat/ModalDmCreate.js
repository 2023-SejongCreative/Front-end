import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
// import { api } from "../api/Interceptors";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const Wrapper = styled.div`
  text-align: center;
`;
const Button = styled.button`
  width: 30px;
  height: 30px;
  color: white;
  border: none;
  border-radius: 50%;
  background-color: #f2c8a1;
  font-size: 25px;

  margin: auto;
  :hover {
    cursor: pointer;
  }
  margin: 15px;
`;

const ModalDmCreate = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dmName, setDmName] = useState("");
  const [sendToWho, setSendToWho] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createDm = () => {};
  return (
    <div>
      <Wrapper>
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          size="small"
        />
        <Button onClick={handleOpen}>+{/* <AddIcon /> */}</Button>
      </Wrapper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onSubmit={createDm}>
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            채팅방 생성
          </Typography>
          <form style={{ textAlign: "center" }}>
            <div>
              {" "}
              채팅방 이름 :{" "}
              <input
                type="text"
                label="채팅방 이름"
                value={dmName}
                onChange={(e) => setDmName(e.target.value)}
              />
            </div>
            <div>
              채팅할 사람 :{" "}
              <input
                type="text"
                label="채팅대상"
                value={sendToWho}
                onChange={(e) => {
                  setSendToWho(e.target.value);
                }}
              />
            </div>
            <p>
              <input type="submit" value="생성" />
            </p>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDmCreate;
