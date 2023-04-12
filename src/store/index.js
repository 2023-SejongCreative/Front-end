import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice.js";
import { groupSlice } from "./groupSlice.js";

const store = configureStore({
  reducer: { user: userSlice.reducer, list: groupSlice.reducer },
});

const rootReducer = combineReducers({
  user: userSlice,
  list: groupSlice,
});
export default store;
