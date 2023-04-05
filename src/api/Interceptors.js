import axios from "axios";
import { useNavigate } from "react-router-dom";
export const api = axios.create({
  proxy: {
    baseURL: `http://172.16.61.131:8080`,
  },

  headers: {
    access_token:
      localStorage.getItem("jwt_accessToken") &&
      localStorage.getItem("jwt_accessToken"),
    refresh_token:
      localStorage.getItem("jwt_accessToken") &&
      localStorage.getItem("jwt_refreshToken"),
  },
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
    // console.log(config);
    return config;
  },
  function (error) {
    // 요청 에러 처리를 작성합니다.
    // console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    /*
        http status가 200인 경우
        응답 바로 직전에 대해 작성합니다. 
        .then() 으로 이어집니다.
    */
    // console.log("get response", response);
    return response;
  },

  function (error) {
    /*
        http status가 200이 아닌 경우
        응답 에러 처리를 작성합니다.
        .catch() 으로 이어집니다.    
    */ console.log("rtk 만료되었습니다. 자동 로그아웃 됩니다.", error);
    const navigate = useNavigate();
    localStorage.removeItem("jwt_accessToken");
    localStorage.removeItem("jwt_refreshToken");
    localStorage.setItem("isAuthorized", false);
    navigate("/login");

    return Promise.reject(error);
  }
);

//  export default api;
