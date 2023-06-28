import { Box, Container, Tab, Typography } from "@mui/material";
import CrudApi from "../../components/crudApi/CrudApi";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useContext, useState } from "react";
import AdminOrders from "./AdminOrders";
import UserContext from "../../context/UserContext";

export default function Admin() {
    const { admin, user } = useContext(UserContext)
    const [value, setValue] = useState('1');
    console.log(admin)
    console.log(user)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container maxWidth="xl">
            { user !== null &&
                <Box sx={{ width: '100%', typography: 'body1', m: 5 }}>
                    {user.type === "admin" ? <TabContext color="secondary" value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList color="secondary" onChange={handleChange} aria-label="lab API tabs example">
                                <Tab color="secondary" label="Productos" value="1" />
                                <Tab color="secondary" label="Órdenes" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel color="secondary" value="1"> <CrudApi /> </TabPanel>
                        <TabPanel color="secondary" value="2"> <AdminOrders /> </TabPanel>
                    </TabContext> :
                        <Typography variant="h4" sx={{mb:70}}>Acceso Denegado</Typography>}
                </Box>
            }

        </Container>
    )

}