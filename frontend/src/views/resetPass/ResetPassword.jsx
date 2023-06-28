import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import { Modal } from "../../components/Alerts/Modal";
import { useLocation } from "react-router-dom";
import { BASE_API_URL } from "../../../config";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Mundo Tenis CGA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function isValidEmail(email) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(email);
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function ResetPassword() {
  const api = helpHttp();

  const [validationErrors, setValidationErrors] = useState({});

  const mailForm = {
    email: "",
  };

  const [emailForm, setEmailForm] = useState(mailForm);

  const validateField = (fieldName, value) => {
    let isValid = true;

    if (fieldName === "email") {
      isValid = isValidEmail(value);
    }

    setValidationErrors((prevState) => ({
      ...prevState,
      [fieldName]: isValid ? undefined : "Campo inválido",
    }));
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;

    setEmailForm({
      ...emailForm,
      [e.target.name]: e.target.value,
    });

    validateField(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(emailForm);

    let url = `${BASE_API_URL}/forgot-password`;
    let options = {
      body: emailForm,
      headers: {
        "Content-type": "application/json",
      },
    };

    api
      .post(url, options)
      .then((res) => {
        if (!res.err) {
          console.log("respuesta de reset password", res);
          let respMessage = res.message;
          let status = res.status;
          Modal(
            "Restablecimiento de contraseña",
            `${respMessage}`,
            `${status}`,
            ""
          );
        }
        console.log("respuesta con error", res);
      })
      .catch((e) => {
        console.log("error del catch", e);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 10,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "groove",
          borderRadius: 3,
          padding: "50px",
          boxShadow: "1px 1px 60px 5px rgba(25, 137, 243, 1)",
        }}
      >
        <Avatar sx={{ m: 0.5, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color="secondary" component="h1" variant="h5">
          Restablecer contraseña
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            color="secondary"
            margin="normal"
            required
            fullWidth
            label="Correo electrónico"
            onChange={handleEmailChange}
            id="email"
            name="email"
            value={emailForm.email}
            autoComplete="email"
            autoFocus
            type="email"
            placeholder="ejemplo@gmail.com"
            error={validationErrors.email !== undefined}
            helperText={validationErrors.email || " "}
          />
          <Button
            type="submit"
            color="secondary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
