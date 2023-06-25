import { Pagination, Grid, Box } from "@mui/material";
import usePagination from "../Pagination/Pagination";
import { useState } from "react";
import OrderItem from "./OrderItem";

export default function PaginationOrder({ orders }) {
    let [page, setPage] = useState(1);
    let PER_PAGE = 12;

    let count = Math.ceil(orders.length / PER_PAGE);
    let _DATA = usePagination(orders, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        < >

            <Grid container spacing={2}>
                {
                    (_DATA.currentData().map(order =>
                        <Grid key={order._id} item md={4} sm={4} xs={6}> <OrderItem key={order._id} order={order} /> </Grid>))
                }

            </Grid>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Pagination
                    sx={{ mt: 2.5, mb: 2.5 }}
                    count={count}
                    size="medium"
                    color="secondary"
                    page={page}
                    variant="text"
                    shape="circular"
                    onChange={handleChange}
                />
            </Box>

        </ >
    )
}