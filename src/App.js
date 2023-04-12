import { api } from "./api/Interceptors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Index";
import Login from "./pages/login/Index";
import Register from "./pages/register/Index";
import Group from "./pages/group/Group";
import Room from "./pages/room/Room";
// import { useSelector } from "react-redux";

function App() {
  // let isAuth = useSelector((state) => state.user.isAuth);

  const onSlientRefresh = () => {
    api
      .post("/reissue", {
        access_token: localStorage.getItem("jwt_accessToken"),
        refresh_token: localStorage.getItem("jwt_refreshToken"),
      })
      .then((response) => {
        localStorage.setItem("jwt_accessToken", response.headers.access_token);
        localStorage.setItem(
          "jwt_refreshToken",
          response.headers.refresh_token
        );
        setInterval(onSlientRefresh, 1500000); //25분마다 리이슈 요청
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //performance.navigation.type===1
  if (PerformanceNavigationTiming.type === "reload") {
    onSlientRefresh();
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" isAuth element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/group/:group_id" element={<Group></Group>}></Route>
          <Route path="/room/:room_id" element={<Room></Room>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
