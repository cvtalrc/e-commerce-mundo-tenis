import { Box, Pagination } from "@mui/material";
import { useState } from "react";

const pageSize = 6;
export default function AppPagination() {
    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize
    })
    return(
        <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', margin: '20px 0px'}}>
            <Pagination></Pagination>
        </Box>
    )
    
}