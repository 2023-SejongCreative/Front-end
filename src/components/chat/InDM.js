import React, { useEffect, useRef, useState } from "react";
import { Box, Divider, Grid, Toolbar, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import styled from "styled-components";

const StyleDMWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyleForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const MyInputBlock = styled.div`
  display: flex;
`;
const MyInput = styled.input`
  width: 300px;
  height: 50px;
  background-color: #fcfcfc;
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
const Button = styled.button`
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
  const client = useRef({});
  const { apply_id } = useParams();
  const { dmId, dmName } = props;
  const [chatName, setChatName] = useState("");
  const [isChat, setIsChat] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");

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
        applyId: apply_id,
        chat: chat,
      }),
    });

    setChat(""); //전송하고 나면 인풋값 비워주기
  };

  const subscribe = () => {
    client.current.subscribe("/sub/chat/" + apply_id, (body) => {
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
    <StyleDMWrapper>
      <div>dmName</div>
      <div className={"chat-list"}>{chatList}</div>
      <StyleForm onSubmit={(event) => handleSubmit(event, chat)}>
        <Wrapper>
          <MyInputBlock>
            <MyInput
              type={"text"}
              name={"chatInput"}
              onChange={handleChange}
              value={chat}
            />
            <Button type="submit" value="전송">
              전송
            </Button>
          </MyInputBlock>
        </Wrapper>
      </StyleForm>
    </StyleDMWrapper>
  );
};

export default InDM;
