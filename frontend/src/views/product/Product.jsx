import { Button, Container, Grid, Typography, Box, ButtonGroup, MenuItem, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import './Product.css'
import { useState, useContext, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductsContext from "../../context/ProductsContext";
import CartContext from "../../context/CartContext";

export default function Product() {
    const { sport, category, id } = useParams();
    const { products } = useContext(ProductsContext)
    const { addToCart, form, setForm } = useContext(CartContext)
    const [itemCount, setItemCount] = useState(1);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if(products!=null) {
            setProduct(products.filter((productF) => productF._id === id))
        }
    }, [products])

    return (
        <>
            {products != null && product != null &&
                <Container sx={{ p: 4, mt: 4, mb: 4 }}>
                    <Grid container >
                        <Grid item md={6}>
                            <img src={product[0].imgUrl}></img>
                        </Grid>
                        <Grid item md={6}>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{product[0].title}</Typography>
                            <Typography variant="h6" sx={{ mb: 1 }} >{product[0].brand}</Typography>
                            <Typography sx={{ mb: 2, textAlign: 'justify', color: 'gray' }}>{product[0].description}</Typography>
                            {product[0].stock[0].size.length > 0 ? (<TextField
                                id="outlined-select-currency"
                                select
                                color="secondary"
                                label="Talla"
                                helperText="Por favor seleccione una talla."
                                onChange={(e) => setForm({ ...form, Size: e.target.value })}
                                value={form.Size || ''}
                                sx={{ mb: 3, mt: 2 }}
                            >
                                {product[0].stock.map((option) => (
                                    <MenuItem key={option.size} value={option.size}>
                                        {option.size}
                                    </MenuItem>
                                ))}
                            </TextField>) : ''}

                            {product[0].sale ?
                                (<Box sx={{ display: 'flex', justifyContent: 'left' }}>
                                    <Typography color="red" variant="h5" sx={{ fontWeight: '700', whiteSpace: 'nowrap' }} > $ {parseFloat((product[0].price - (product[0].price * (product[0].percentageSale / 100))).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} 
                                    </Typography>
                                    <Typography color="secondary" variant="h5" sx={{ fontWeight: '700', textDecoration: 'line-through', ml: 1 }}>$ {product[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </Typography>
                                </Box>)
                                :
                                (<Typography color="secondary" variant="h5" sx={{ fontWeight: '700' }} > $ {product[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>)
                            }

                            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
                                <ButtonGroup>
                                    <Button
                                        onClick={() => {
                                            setItemCount(Math.max(itemCount - 1, 1));
                                        }}
                                    >
                                        {" "}
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button size="large">{itemCount}</Button>
                                    <Button
                                        onClick={() => {
                                            setItemCount(itemCount + 1);
                                        }}
                                    >
                                        {" "}
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </ButtonGroup>
                                <Button onClick={() => {
                                    addToCart(product[0]._id, product[0].title, form.Size, itemCount);
                                }}
                                    color="secondary" variant="outlined" sx={{ width: { sm: '40%', xs: '100%' }, mt: 4 }}>
                                    <ShoppingCartIcon fontSize="small" sx={{ mr: 2 }} />
                                    Agregar al carro
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            }
        </>
    )
}