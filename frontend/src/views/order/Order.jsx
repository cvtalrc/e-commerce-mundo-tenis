import { Container, Typography } from "@mui/material";
import FormStepper from "../../components/formStepper/FormStepper";

export default function Order() {
    return (
        <>
            {/* <Typography variant="h3">Order</Typography> */}
            <Container sx={{mt: 10, mb: 10}}>
            <FormStepper/>
            </Container>
        </>
    )
}