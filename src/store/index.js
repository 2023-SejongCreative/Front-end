import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice.js";
const store = configureStore({
  reducer: { user: userSlice.reducer },
});

const rootReducer = combineReducers({
  user: userSlice,
});
export default store;
