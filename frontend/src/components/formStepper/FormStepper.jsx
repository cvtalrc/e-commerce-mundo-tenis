import React, { useState, useContext } from "react";
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

function getSteps() {
  return [
    "Resumen",
    // "Iniciar Sesión",
    "Entrega",
    "Medio de Pago",
    "Revisar y Pagar",
  ];
}

function getStepContent(step) {
  const { cartProducts, totalPrice } = useContext(CartContext);

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
        <Typography>Entrega</Typography>
      )

    case 2:
      return (<Typography>Medio de pago</Typography>)
    case 3:
      return <Typography>Revisar y pagar</Typography>
    default:
      return "unknown step";
  }
}

const FormStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { user } = useContext(UserContext)


  const handleNext = (data) => {
    console.log(data);
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

      {activeStep === steps.length ? (
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
      )}
    </div>
  )
};

export default FormStepper;