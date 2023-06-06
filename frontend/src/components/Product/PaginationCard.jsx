import { Container, Pagination, Grid, Box } from "@mui/material";
import usePagination from "../Pagination/Pagination";
import Card from "./Card";
import { useState } from "react";

export default function PaginationCard({ products, type }) {
    let [page, setPage] = useState(1);
    let PER_PAGE = 8;
    if (type == 'sale') {
        PER_PAGE = 4;
    }


    let count = Math.ceil(products.length / PER_PAGE);
    let _DATA = usePagination(products, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        < >

            <Grid container spacing={2}>

                {_DATA.currentData().map(product => <Grid key={product._id} item md={3} sm={4} xs={6}> <Card key={product._id} product={product} /> </Grid>)}

            </Grid>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Pagination
                    sx={{ m: 2.5 }}
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