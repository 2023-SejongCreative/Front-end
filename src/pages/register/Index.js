import React, { useState } from "react";
import axios from "axios";
import api from "../../api/Interceptors";
import { MyButton, MyTypography, MyLink } from "./style";
import { useNavigate, NavLink, Link } from "react-router-dom";

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
  const theme = createTheme();
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const checkEmail = (e) => {
    const emailRegexp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailRegexp.test(e.target.value))
      alert("올바르지 않은 이메일 형식입니다.");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    console.log(password2);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const handeCheckedChange = (e) => {
    setChecked(e.target.value);
  };
  const navigate = useNavigate();

  // form 전송
  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: password,
      name: name,
    };
    if (email == "") alert("이메일을 입력해주세요");
    else if (password == "") alert("비밀번호를 입력해주세요");
    else if (password2 == "") alert("비밀번호 확인를 입력해주세요");
    else if (name == "") alert("이름을 입력해주세요");
    else if (checked == false) alert("회원가입 약관에 동의해주세요");
    else if (password !== password2)
      alert("비밀번호와 비밀번호 확인 같지 않습니다.\n다시 입력해주세요.");
    else {
      await axios
        .post("/register", body)
        .then((response) => {
          console.log(response);

          if (response.status == 200) {
            alert("회원가입에 성공하셨습니다. 로그인을 진행해주세요! ");
            navigate("/login");
          } else if (response.status == 400) {
            alert("이미 회원가입 완료한 이메일입니다.");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
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
            Waffle 회원가입
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
                    label="이메일 주소"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={checkEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 확인"
                    value={password2}
                    onChange={handlePassword2Change}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="이름(실명)"
                    value={name}
                    onChange={handleNameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handeCheckedChange}
                        value={checked}
                        color="primary"
                      />
                    }
                    label="회원가입 약관에 동의합니다."
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
                회원가입
              </MyButton>
            </FormControl>
          </Box>
          <MyLink
            component="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            이미 회원가입을 했다면? 로그인 하러가기
          </MyLink>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Index;
