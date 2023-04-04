import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Index";
import Login from "./pages/login/Index";
import Register from "./pages/register/Index";
function App() {
  localStorage.setItem("isAuthorized", false);
  let isAuthorized = localStorage.getItem("isAuthorized");

  const onSlientRefresh = () => {
    axios
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
        setInterval(onSlientRefresh, 1500000);
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
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
