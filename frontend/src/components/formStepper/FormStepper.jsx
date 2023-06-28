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
import FormCheck from "./FormCheck";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { BASE_API_URL } from "../../../config";

function getSteps() {
  return [
    "Resumen",
    // "Iniciar Sesión",
    "Entrega",
    "Revisar y Pagar",
  ];
}

let editForm = ''
let formGlobal = ''

function getStepContent(step) {
  const { cartProducts, totalPrice } = useContext(CartContext);
  const { user } = useContext(UserContext)
  const [form, setForm] = useState(null)
  const [edit, setEdit] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState('store-pickup');
  editForm = edit
  formGlobal = form

  useEffect(() => {
    if (user != null) {
      const initialForm = { //datos de envío
        delivery: deliveryMethod, //delivery, retiro
        name: user.name,
        lastName: user.lastName,
        email: user.email,
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
        <Box sx={{ mt: 4, mb: 4, border: '1px solid #bebebe', borderRadius: 1, p: 2 }}>

          {
            cartProducts && cartProducts.length > 0 ?
              cartProducts.map((item, index) => (
                <CartItem key={index} data={item} id={false} />
              ))
              :
              <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: 'column', alignItems: "center", height: "200px" }}>
                <AddShoppingCartOutlinedIcon color="secondary" sx={{ mt: 2, fontSize: 100, strokeWidth: 0.5 }} />
                <Typography variant="h6" color="secondary" sx={{ fontWeight: 500, mt: 2 }}>Agrega productos a tu carrito</Typography>
              </Box>
          }
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', ml: 3, mr: 3, mb: 1.5 }}>
            {cartProducts && cartProducts.length > 0 ?
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', borderTop: "thin solid gray", borderBottom: "thin solid gray", mb: 2, mt: 2 }}>
                <Typography sx={{ fontWeight: 600, mt: .5, mb: .5, fontSize: { xs: '18px', md: '20px' } }}>Total: </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mt: .5, mb: .5, fontSize: { xs: '18px', md: '20px' } }}> ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </Typography>

              </Box>
              : ''
            }
          </Box>

        </Box>
      );
    case 1:
      return (
        <>
          {user != null &&
            <FormDelivery user={user} form={form} setForm={setForm} deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} edit={edit} setEdit={setEdit} />
          }
        </>
      )

    case 2:
      return (
        <>
          {cartProducts != null &&
            <FormCheck cartProducts={cartProducts} totalPrice={totalPrice} form={form} />
          }
        </>
      )
    default:
      return "unknown step";

  }
}

const FormStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { user } = useContext(UserContext)
  const { token } = useContext(UserContext)
  const { cartProducts, totalPrice } = useContext(CartContext);
  let api = helpHttp();

  const paymentApi = async () => {
    // const url = "http://localhost:3000/api/payment"

    // const options = {
    //   body: {
    //     "userID": user._id,
    //     "Delivery": formGlobal
    //   },
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json"
    //   }
    // }

    // const response = await api
    //   .post(url, options)
    //   .then((res) => {
    //     console.log("respuesta a consulta formStepper", response)
    //     return res
    //   })
    //   .catch((err) => {
    //     console.log('Error fatal: ', err);
    //   })

    // if (response != undefined) {
    //   const form = document.createElement('form');
    //   form.action = response.url;
    //   form.method = 'POST';

    //   const tokenInput = document.createElement('input');
    //   tokenInput.type = 'hidden';
    //   tokenInput.name = 'token_ws';
    //   tokenInput.value = response.token;

    //   form.appendChild(tokenInput);
    //   document.body.appendChild(form);
    //   form.submit();

    // }

    try {
      const url = `${BASE_API_URL}/payment`;
      const options = {
        body: {
          userID: user._id,
          Delivery: formGlobal,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post(url, options); // Esperar la respuesta del servidor

      const form = document.createElement("form");
      form.action = response.url;
      form.method = "POST";

      const tokenInput = document.createElement("input");
      tokenInput.type = "hidden";
      tokenInput.name = "token_ws";
      tokenInput.value = response.token;

      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.log("Error fatal: ", error);
    }

  }

  const handleNext = async (data) => {
    // console.log(data.target);
    if (steps.length === activeStep + 1) {
      console.log('Vamos a ir a pagar')
      await paymentApi();
      return;
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
            disabled={editForm || (cartProducts && cartProducts.length === 0)}
          >
            {activeStep === steps.length - 1 ? "Pagar" : "Siguiente"}
          </Button>
        </Box>
      </>
    </div>
  )
};

export default FormStepper;