import React, { useEffect, useState } from "react";
import axios from "axios";
import { MyButton, MyTypography } from "./style";
import api from "../../api/Interceptors";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { MyLink } from "./style";
import {
  //Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  //FormHelperText,
  Grid,
  Box,
  //Typography,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = createTheme();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const navigate = useNavigate();

  //form 전송
  const handleSubmit = async (e) => {
    let body = {
      email: email,
      password: password,
    };
    e.preventDefault();
    // await api
    //   .post(`/login`, body)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.error("Error:", error));
    await axios
      .post("/login", body)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          alert("로그인 완료! Waffle에 오신걸 환영합니다❤️");
          navigate("/");
          localStorage.setItem("jwt_accessToken", response.data);
          localStorage.setItem("isAuthorized", true);
          console.log(localStorage.getItem("jwt_accessToken"));
          console.log(localStorage.getItem("isAuthorized"));
        } else if (response.response.data.code == "LOGIN-001") {
          alert("일치하는 회원이 없습니다. 먼저 회원가입을 진행해주세요!");
        } else if (response.response.data.code == "LOGIN-002") {
          alert("비밀번호가 일치하지 않습니다.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MyTypography component="h1" variant="h5">
            Waffle 로그인
          </MyTypography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소를 입력하세요"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호를 입력하세요"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Grid>
              </Grid>
              <MyButton
                type="submit"
                fullWidth
                // variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                로그인
              </MyButton>
            </FormControl>
          </Box>
          <MyLink
            component="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            회원가입
          </MyLink>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Index;
