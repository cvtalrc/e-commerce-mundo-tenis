import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box
} from "@mui/material";

import LoginForm from "../LoginForm/LoginForm";
import ShoppingCart from "../shoppingCart/ShoppingCart";
import { green } from "@mui/material/colors";


function getSteps() {
  return [
    "Resumen",
    "Iniciar Sesión",
    "Dirección",
    "Transporte",
    "Pago",
  ];
}

function getStepContent(step) {
  let skipCase = false

  switch (step) {
    case 0:
      if(localStorage.getItem('userName')) {
        skipCase = true
      }  
      return < ShoppingCart />;
    case 1:
      if (skipCase) {
        skipCase = false
        setActiveStep(step + 1)
      }
    case 2:
      return <Typography>Dirección</Typography>
    case 3:
      return <Typography>Transporte</Typography>
    case 4:
      return <Typography>Pago</Typography>
    default:
      return "unknown step";
  }
}

const FormStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();


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
            <Step  {...stepProps} key={index}>
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
            sx={{mr:1}}
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
            {activeStep === steps.length - 1 ? "Finish" : "Siguiente"}
          </Button>
        </Box>
        </>
      )}
    </div>
  );
};

export default FormStepper;