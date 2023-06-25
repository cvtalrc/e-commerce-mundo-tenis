import { Box, Container, PaginationItem, Typography } from "@mui/material";
import CrudApi from "../../components/crudApi/CrudApi";
import OrderItem from "../../components/OrderItem/OrderItem";
import { useContext } from "react";
import OrderContext from "../../context/OrderContext";
import PaginationOrder from "../../components/OrderItem/PaginationOrder";

export default function AdminOrders() {
    const {orders} = useContext(OrderContext)

    // const orders = [
    //     {
    //         "_id": 1
    //     },
    //     {
    //         "_id": 2
    //     },
    //     {
    //         "_id": 3
    //     },
    //     {
    //         "_id": 4
    //     },
    //     {
    //         "_id": 5
    //     },
    //     {
    //         "_id": 6
    //     },
    //     {
    //         "_id": 7
    //     },
    //     {
    //         "_id": 8
    //     },
    //     {
    //         "_id": 9
    //     },
    //     {
    //         "_id": 10
    //     },
    //     {
    //         "_id": 11
    //     },
    //     {
    //         "_id": 12
    //     },
    //     {
    //         "_id": 13
    //     },
    //     {
    //         "_id": 14
    //     },
    //     {
    //         "_id": 15
    //     },
    //     {
    //         "_id": 16
    //     }
        
    // ]
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