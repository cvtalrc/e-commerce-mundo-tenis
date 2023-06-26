import { Box, Container, PaginationItem, Typography } from "@mui/material";
import CrudApi from "../../components/crudApi/CrudApi";
import OrderItem from "../../components/OrderItem/OrderItem";
import { useContext } from "react";
import OrderContext from "../../context/OrderContext";
import PaginationOrder from "../../components/OrderItem/PaginationOrder";

export default function AdminOrders() {
    const {orders} = useContext(OrderContext)

    
    return (
        <>
        {orders != null &&
        <Container maxWidth="xl">
            <Box sx={{mt: 5, mb:5}}>
            <Typography variant="h4" sx={{fontWeight: 700, mb:4}}>Panel de Administración de Órdenes</Typography>
            
                <PaginationOrder orders={orders}/>
            
            </Box>
            
        </Container>
        }
        </>
    )

}