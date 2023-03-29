import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Index";
import Login from "./pages/login/Index";
import Register from "./pages/register/Index";
function App() {
  localStorage.setItem("isAuthorized", false);
  let isAuthorized = localStorage.getItem("isAuthorized");
  //console.log(isAuthorized);
  return (
    <div>
      <BrowserRouter>
        {isAuthorized === false ? (
          <Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
        ) : (
          <Navigate path="/"></Navigate>
        )}
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
