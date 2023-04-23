import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import styled from "styled-components";
import { api } from "../../api/Interceptors";
import ModalDmInvite from "./ModalDmInvite";

const DmHeaderData = styled.p`
  @media screen and (max-width: 1000px) {
    position: fixed;
    left: 700px;
  }
`;
const DMChatHeader = styled.div`
  width: ${(props) => props.resize[0] - 6000}px;
  height: ${(props) => props.resize[1] - 700}px;
  height: 50px;
  top: 80px;
  left: 580px;
  background-color: #f5b66c;
  display: flex;
`;
const StyleBox = styled.div`
  position: fixed;
  width: 500px;
  height: 550px;
  width: ${(props) => props.resize[0] - 600}px;
  height: ${(props) => props.resize[1] - 200}px;
  background-color: seashell;
  top: 80px;
  left: 580px;
  overflow-y: scroll;
`;
const StyleDMWrapper = styled.div`
  position: fixed;
  top: 700px;
  left: 600px;
  top: ${(props) => props.resize[1] - 100}px;
  left: ${(props) => props.resize[0] - 480}px;
`;
const StyleForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: right; */
`;

const MyInputBlock = styled.div`
  display: flex;
  @media screen and (max-width: 1000px) {
    position: fixed;
    left: 600px;
  }
`;
const MyInput = styled.input`
  width: 400px;
  height: 50px;
  background-color: rgba(245, 182, 108, 0.2);
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #f5b66c;
  }
`;
const Wrapper = styled.div`
  text-align: center;
`;
const ButtonInDM = styled.button`
  width: 30px;
  height: 30px;
  color: #f2c8a1;
  border: solid 1px #f2c8a1;
  border-radius: 50%;
  background-color: white;
  font-size: 24px;

  margin: auto;
  :hover {
    cursor: pointer;
  }
  margin: 5px;
`;
const ButtonSubmit = styled.button`
  width: 50px;
  height: 30px;
  color: white;
  border: none;
  border-radius: 10px;
  background-color: #f5b66c;
  font-size: 15px;
  font-weight: bold;

  margin: auto;
  :hover {
    cursor: pointer;
  }
  margin: 15px;
`;

const InDM = (props) => {
  const [resize, setResize] = useState([]);
  const navigate = useNavigate();
  const handleResize = () => {
    setResize([window.innerWidth, window.innerHeight]);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log(resize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [resize]);

  useEffect(() => {
    api
      .get(`/chat/${dm_id}/userlist`)
      .then((response) => {
        console.log(response);
        setPeopleIncluded(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //InviteFriendToDM 함수 채팅방 초대 모달 만들어서 거기 생성 부분에 옮기기
  const InviteFriendToDM = () => {
    // let chat_id=dm_id
    api
      .post(`/chat/${dm_id}/invite`, {})
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const LeaveDM = () => {
    if (window.confirm("이 채팅방을 나가시겠습니까?")) {
      api
        .post("/chat/leave")
        .then((response) => {
          console.log(response);
          navigate("/chat");
        })
        .catch((err) => console.log(err));
    } else {
      alert("채팅방 나가기를 취소하셨습니다.");
    }
  };

  const client = useRef({});

  const { dm_id } = useParams();
  const location = useLocation;
  // const dmID = location.state.dmID;
  // const dmName = location.state.dmName;
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");
  const [peopleIncluded, setPeopleIncluded] = useState();

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8787/ws",
      onConnect: () => {
        console.log("success");
        subscribe();
      },
    });
    client.current.activate();
  };

  const publish = (chat) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify({
        dm_id: dm_id,
        chat: chat,
      }),
    });

    setChat(""); //전송하고 나면 인풋값 비워주기
  };

  const subscribe = () => {
    client.current.subscribe("/sub/chat/" + dm_id, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((_chat_list) => [..._chat_list, json_body]);
    });
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = (event) => {
    // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  const handleSubmit = (event, chat) => {
    // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();
    publish(chat);
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  return (
    <StyleDMWrapper resize={resize}>
      <div>{chatList}</div>
      <StyleBox resize={resize}>
        <DMChatHeader resize={resize}>
          {/* <ButtonInDM onClick={InviteFriendToDM}>
            +
          </ButtonInDM> */}
          <ButtonInDM onClick={LeaveDM}>-{/* <AddIcon /> */}</ButtonInDM>
          <ModalDmInvite dm_id={dm_id} />

          <h3 style={{ margin: "10px" }}>채팅방 이름</h3>
          <p> - 전서현, 최호경, 주다현</p>
        </DMChatHeader>

        {[
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ]}
      </StyleBox>

      <StyleForm onSubmit={(event) => handleSubmit(event, chat)}>
        <Wrapper>
          <MyInputBlock>
            <MyInput
              type={"text"}
              name={"chatInput"}
              onChange={handleChange}
              value={chat}
              resize={resize}
            />
            <ButtonSubmit type="submit" value="전송">
              전송
            </ButtonSubmit>
          </MyInputBlock>
        </Wrapper>
      </StyleForm>
    </StyleDMWrapper>
  );
};

export default InDM;
