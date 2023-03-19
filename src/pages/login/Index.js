import React, { useState } from "react";
import { MyButton, MyTypography } from "./style";

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

  // form 전송
  const handleSubmit = (e) => {
    e.preventDefault();
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
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Index;
