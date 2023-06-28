import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
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
      <Link color="inherit" href="/">
        Mundo Tenis CGA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function isValidPass(pass) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(pass);
}
// TODO remove, this demo shouldn't need to reset the theme.

export default function ResetPass() {
  const param = useLocation();
  const token = param.search;
  console.log("token contraseña", token);
  const [validationErrors, setValidationErrors] = useState({});

  const passwordForm = {
    newPass: "",
    pass: "",
  };

  const [passForm, setPassForm] = useState(passwordForm);

  const validateField = (fieldName, value) => {
    let isValid = true;

    if (fieldName === "newPass") {
      isValid = isValidPass(value);
    } else if (fieldName === "pass") {
      isValid = isValidPass(value);
    }

    setValidationErrors((prevState) => ({
      ...prevState,
      [fieldName]: isValid ? undefined : "Campo inválido",
    }));
  };

  const handlePassChange = (e) => {
    const { name, value } = e.target;

    setPassForm({
      ...passForm,
      [name]: value,
    });

    validateField(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (passForm.newPass !== passForm.pass) {
      setValidationErrors((prevState) => ({
        ...prevState,
        pass: "Las contraseñas no coinciden",
      }));
      return;
    }

    let url = `${BASE_API_URL}/reset-password${token}`;
    let options = {
      method: 'POST',
      body: JSON.stringify({ pass: passForm.pass }),
      headers: {
        "Content-type": "application/json",
      },
    };
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        if (res.ok) {
          const data = await res.json();
          console.log("respuesta de compra", data);
          Modal(
            'Restablecimiento de contraseña',
            `${data.message}`,
            `${data.status}`,
            ''
          )
        } else {
          console.error("Error en la respuesta de la petición");
        }
      } catch (error) {
        console.error("Error fatal: ", error);
      }
    };

    if (param.search) {
      fetchData();
    }
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
            name="newPass"
            id="newPass"
            label="Nueva contraseña"
            onChange={handlePassChange}
            value={passForm.newPass}
            type="password"
            autoComplete="current-password"
            placeholder="**********"
            error={validationErrors.newPass !== undefined}
            helperText={validationErrors.newPass || " "}
          />
          <TextField
            color="secondary"
            margin="normal"
            required
            fullWidth
            name="pass"
            id="pass"
            label=" Confirma tu contraseña"
            onChange={handlePassChange}
            value={passForm.pass}
            type="password"
            autoComplete="current-password"
            placeholder="**********"
            error={validationErrors.pass !== undefined}
            helperText={validationErrors.pass || " "}
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
