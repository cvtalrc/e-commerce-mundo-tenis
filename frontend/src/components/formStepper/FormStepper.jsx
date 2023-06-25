import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Grid
} from "@mui/material";

import CartContext from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import UserContext from "../../context/UserContext";
import { helpHttp } from "../../helpers/helpHttp";
import FormDelivery from "./FormDelivery";

function getSteps() {
  return [
    "Resumen",
    // "Iniciar Sesión",
    "Entrega",
    "Revisar y Pagar",
  ];
}


function getStepContent(step) {
  const { cartProducts, totalPrice } = useContext(CartContext);
  const { user } = useContext(UserContext)
  const [deliveryMethod, setDeliveryMethod] = useState('store-pickup');
  const [form, setForm] = useState(null)

  useEffect(() => {
    if (user != null) {
      const initialForm = { //datos de envío
        delivery: deliveryMethod, //delivery, retiro
        name: user.name,
        lastName: user.lastName,
        address: user.address,
        region: user.region,
        comuna: user.comuna,
        cellNumber: user.cellNumber,
        instructions: ""
      };
      setForm(initialForm)
    }

  }, [user]);

  switch (step) {
    case 0:
      return (
        <Grid container sx={{ borderBottom: "thin solid gray", margin: '20px', pt: 2 }}>
          <Grid item sx={{ width: '100%', height: '30%' }}>
            {
              cartProducts && cartProducts.map((item, index) => (
                <CartItem key={index} data={item} id={false} />
              ))
            }
          </Grid>
          <Grid item sx={{ width: '100%', height: '30%' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontSize: 20, pl: 'auto', pt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
              Total: ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Typography>
          </Grid>
        </Grid>
      );
    case 1:
      return (
        <>
          {user != null &&
            <FormDelivery user={user} form={form} setForm={setForm} deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} />
          }
        </>
      )

    case 2:
      return (<>
        <Typography>Revisar y pagar</Typography>

        <Typography>Productos: </Typography>
        <Typography>Total: </Typography>

        <Typography>Tipo de Entrega: {form.delivery}</Typography>
        {form.delivery === 'store-pickup' ?
          <>
            <Typography>Datos de retiro: </Typography>
            <Typography>Dirección: blahalbha </Typography>
            <Typography>Contacto: blahblah </Typography>
          </>
          :
          <>
            <Typography>Datos de entrega: </Typography>
            <Typography>Nombre: {form.name}</Typography>
            <Typography>Apellido: {form.lastName}</Typography>
            <Typography>Celular: {form.cellNumber}</Typography>
            <Typography>Dirección: {form.address} {form.addressNumber}</Typography>
            <Typography>Región: {form.region}</Typography>
            <Typography>Comuna: {form.comuna}</Typography>
            {form.instructions ? <Typography>Instrucciones de entrega: {form.instructions}</Typography> : ''
            }
          </>

        }

      </>)
    default:
      return "unknown step";

  }
}

const FormStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { user } = useContext(UserContext)
  const { token } = useContext(UserContext)
  let api = helpHttp();

  const paymentApi = async () => {
    const url = "http://localhost:3000/api/payment"

    const options = {
      body: { 
              "userID" : user._id,
              "Delivery" : form 
            },
      headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
      }

    }

    const response  = await api
      .post(url, options)
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log('Error fatal: ', err);
      })
      
      const form = document.createElement('form');
      form.action = response.url;
      form.method = 'POST';

      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = 'token_ws';
      tokenInput.value = response.token;

      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();
  }
  const handleNext = async (data) => {
    // console.log(data.target);
    if(steps.length === activeStep + 1){

      console.log('Vamos a ir a pagar')
      await paymentApi();

      return ;
    }
    if (activeStep == steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};

          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", justifyContent: "right" }} >
            <Button
              sx={{ mr: 1 }}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Atrás
            </Button>
            <Button
              // className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleNext}
              type="submit"
            >
              {activeStep === steps.length - 1 ? "Pagar" : "Siguiente"}
            </Button>
          </Box>
        </>

      {/* {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", justifyContent: "right" }} >
            <Button
              sx={{ mr: 1 }}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Atrás
            </Button>
            <Button
              // className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleNext}
              type="submit"
            >
              {activeStep === steps.length - 1 ? "Pagar" : "Siguiente"}
            </Button>
          </Box>
        </>
      )} */}
    </div>
  )
};

export default FormStepper;