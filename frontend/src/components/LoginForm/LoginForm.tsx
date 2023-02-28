import React, { useState, useEffect } from "react";
import axios from "axios";
import { SECTION_ENDPOINT } from "../../consts";
import { useAxiosFetch } from "../../hooks";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import { SectionPage } from "../SectionPage";
import { SectionData } from "sections";


const LoginForm = () => {
  const [remember, setRemember] = useState(false);
  const {data, loading, error} = useAxiosFetch<SectionData>({api: `${SECTION_ENDPOINT}${"1"}`, withCredentials: false,})
  console.log(data)

  const questions = data?.questions
  console.log(questions)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // get form data
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const pass = data.get("password");
    if (!email || !pass) {
      alert("Please enter fields");
      return;
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      {data?.section && <SectionPage section={data.section}/>}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="remember"
                value={remember}
                color="primary"
                onChange={() => setRemember(!remember)}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
