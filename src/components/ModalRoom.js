import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { api } from "../api/Interceptors";
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
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #f5b66c;
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  :hover {
    cursor: pointer;
  }
`;

const ModalRoom = (props) => {
  const { group_id } = props;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [room_name, setRoom_name] = useState("");
  const [type, setType] = useState(1);
  const email = useSelector((state) => state.user.email);

  const createRoom = async (e) => {
    e.preventDefault();

    let body = {
      room_name: room_name,
      type: type,
      email: email,
    };
    await api
      .post(`/${group_id}/createroom`, body)
      .then((response) => {
        console.log(response);
        // let group_id = response.data.id;
        // navigate("/group");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Wrapper>
        <Button onClick={handleOpen}>
          + &nbsp;Room Create
          {/* <AddIcon /> */}
        </Button>
      </Wrapper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onSubmit={createRoom}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            룸 생성
          </Typography>
          <form>
            룸 이름 :{" "}
            <input
              type="text"
              label="룸 이름"
              value={room_name}
              onChange={(e) => setRoom_name(e.target.value)}
            />
            <div>
              <input
                type="radio"
                name="공개여부"
                value="1"
                checked
                onClick={() => setType(1)}
              />
              public
              <input
                type="radio"
                name="공개여부"
                value="0"
                onClick={() => setType(0)}
              />
              private
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
export default ModalRoom;
