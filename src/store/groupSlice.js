import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
  name: "list",
  initialState: {
    groupList: [],
    roomList: [],
  },
  reducers: {
    addGroup(state, action) {
      state.groupList.push(action.payload);
    },
    addRoom(state, action) {
      state.roomList.push(action.payload);
    },
    deleteGroup(state, action) {
      state.groupList.filter(
        (v) => state.groupList.group_name !== action.payload
      );
    },
    deleteRoom(state, action) {
      state.roomList.filter((v) => state.roomList.room_name !== action.payload);
    },
  },
});
