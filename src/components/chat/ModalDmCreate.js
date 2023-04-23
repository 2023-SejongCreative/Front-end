import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { api } from "../../api/Interceptors";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Margin } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
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
const DMcreateInput = styled.input`
  margin: 10px;
`;

const ModalDmCreate = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dmName, setDmName] = useState("");
  const [sendToWho1, setSendToWho1] = useState("");
  const [sendToWho2, setSendToWho2] = useState("");
  const [sendToWho3, setSendToWho3] = useState("");
  const [sendToWho4, setSendToWho4] = useState("");
  const [sendToWho5, setSendToWho5] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //채팅방 생성 post함수
  const createDm = () => {
    let emailArray = [];
    if (sendToWho1 !== "") emailArray.push(sendToWho1);
    if (sendToWho2 !== "") emailArray.push(sendToWho2);
    if (sendToWho3 !== "") emailArray.push(sendToWho3);
    if (sendToWho4 !== "") emailArray.push(sendToWho4);
    if (sendToWho5 !== "") emailArray.push(sendToWho5);

    let body = { name: dmName, email: emailArray };
    if (dmName === "" || sendToWho1 === "")
      alert("채팅방 이름과 초대자 1명은 필수 입력입니다.");
    else {
      console.log("채팅방 생성!");
      api
        .post("/chat/create", body)
        .then((response) => {
          console.log("채팅방 생성!", response);
          // 요 밑에 채팅방 아이디 받으면(dmID) dm방에 id 세팅할 것
          handleClose();
          // navigate(`/chat/4`, {
          //   state: {
          //     dmID: 4,
          //     dmName: dmName,
          //   },
          // });
        })
        .catch((err) => console.log(err));
    }
  };
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
            style={{ textAlign: "center", fontSize: "30px", margin: "10px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            채팅방 생성
          </Typography>
          <form style={{ textAlign: "center" }}>
            <div style={{ margin: "10px" }}>
              {" "}
              채팅방 이름{" "}
              <div>
                <DMcreateInput
                  type="text"
                  label="채팅방 이름"
                  value={dmName}
                  onChange={(e) => setDmName(e.target.value)}
                  placeholder="채팅방 이름"
                />
              </div>
            </div>
            <div>
              채팅할 사람{" "}
              <div>
                <DMcreateInput
                  type="text"
                  label="채팅대상"
                  value={sendToWho1}
                  onChange={(e) => {
                    setSendToWho1(e.target.value);
                  }}
                  required
                  placeholder="초대자1 - 필수입력"
                />
              </div>
              <div>
                <DMcreateInput
                  type="text"
                  label="채팅대상"
                  value={sendToWho2}
                  onChange={(e) => {
                    setSendToWho2(e.target.value);
                  }}
                  placeholder="초대자2"
                />
              </div>
              <div>
                <DMcreateInput
                  type="text"
                  label="채팅대상"
                  value={sendToWho3}
                  onChange={(e) => {
                    setSendToWho3(e.target.value);
                  }}
                  placeholder="초대자3"
                />
              </div>
              <div>
                <DMcreateInput
                  type="text"
                  label="채팅대상"
                  value={sendToWho4}
                  onChange={(e) => {
                    setSendToWho4(e.target.value);
                  }}
                  placeholder="초대자4"
                />
              </div>
              <div>
                <DMcreateInput
                  type="text"
                  label="채팅대상"
                  value={sendToWho5}
                  onChange={(e) => {
                    setSendToWho5(e.target.value);
                  }}
                  placeholder="초대자5"
                />
              </div>
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
