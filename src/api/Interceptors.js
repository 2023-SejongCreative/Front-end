import axios from "axios";
const api = axios.create({
  baseURL: `http://192.168.0.7:8080`,
  //timeout: 1000,
  //headers: { "Content-type": "application/json" },
  //헤더에는 보통 데이터 타입을 기입
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
    */
    // console.log("response error", error);
    return Promise.reject(error);
  }
);

export default api;
