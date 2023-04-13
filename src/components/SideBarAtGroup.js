import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalRoom from "./ModalRoom";
import { useNavigate, useParams } from "react-router-dom";
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
import ModalInviteGroup from "./ModalInviteGroup";
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
let roomName = [],
  groupName = [];
const SideBarAtGroup = (props) => {
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
  const { group_id } = useParams();
  const { group_name, groups, groupNames } = props;
  const [rooms, setRooms] = useState([]);
  const [roomNames, setRoomNames] = useState([]);
  // const [groupNames, setGroupNames] = useState([]); //여기서 groups에서 group_name들을 뽑아낸것을 배열로 만듦
  const user_email = useSelector((state) => state.user.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //여기서 현재 들어와있는 그룹 name 보여주기(약간 myspace처럼)
    //그러러면 그룹이름을 클릭했을 때 props로 그룹이름 넘겨줘야함 --> 완료

    // 특정 그룹 안에 와 있지만 그룹 목록도 보여줘야 함
    // groups.forEach((v) => {
    //   groupName.push(v["group_name"]);
    // });
    // setGroupNames(groupName);

    //룸 목록 요청 api
    api
      .get(`/${group_id}/rooms`)
      // .get(`/rooms`)
      .then((response) => {
        console.log(response);
        setRooms(response.data.room);
        // setRooms(response.data);

        response.data.room.forEach((v) => {
          roomName.push(v["room_name"]);
        });
        setRoomNames(roomName);
      })
      //
      .catch((err) => console.log(err));
  }, []);

  const DeleteGroup = async () => {
    let index;
    groups.forEach((v, i) => {
      if (v.group_id == group_id) index = i;
    });
    if (groups[index].manager !== 1) {
      alert("관리자만 삭제할 수 있습니다.");
    } else {
      if (window.confirm(`${group_name} 그룹을 삭제하시겠습니까?`)) {
        await api
          .delete(`/${group_id}/deletegroup`)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              alert("그룹 삭제가 완료되었습니다.");
              navigate("/");
            } else alert("관리자가 아닙니다!");
          })
          .catch((err) => console.log(err));
      } else {
        alert("룸 삭제를 취소하셨습니다.");
      }
    }
  };

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
    let group_id = groups[groupNames.indexOf(text)].group_id;
    navigate(`/group/${group_id}`, {
      state: { groups: groups, group_name: text, groupNames: groupNames },
    });
    window.location.reload();
  };
  const moveRoomPage = async (text) => {
    let room_id = rooms[roomNames.indexOf(text)].room_id;
    navigate(`/room/${room_id}`, {
      state: {
        rooms: rooms,
        room_name: text,
        group_id: group_id,
        groups: groups,
        groupNames: groupNames,
      },
    });
    window.location.reload();
  };
  // const group_id = useSelector((state) => state.list.groupList);
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
          <div>{group_name}</div>
          {groupNames.map((text, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => moveGroupPage(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {roomNames.map((text, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => moveRoomPage(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <BtnWrapper>
          <ModalInviteGroup group_id={group_id} />
        </BtnWrapper>
        <ModalRoom
          group_id={group_id}
          groups={groups}
          rooms={rooms}
          roomNames={roomNames}
          groupNames={groupNames}
        />
        <BtnWrapper>
          <DeleteBtn onClick={DeleteGroup}>-&nbsp;Group Delete</DeleteBtn>
          <LogoutBtn onClick={Logout}>Logout</LogoutBtn>
        </BtnWrapper>
      </Drawer>
    </div>
  );
};

export default SideBarAtGroup;
