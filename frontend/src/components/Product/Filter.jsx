import { Typography, Grid, FormControlLabel, Checkbox, Slider, Box } from "@mui/material";
import { useState } from "react";

export default function Filter({ products, brands, dataFilter, setDataFilter }) {
    const prices = products.map((product) => product.price);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    const initialState = brands.reduce((obj, brand) => {
        return { ...obj, [brand]: false };
    }, {});

    const [brandsSelected, setBrandsSelected] = useState(initialState)
    const [dataBrands, setDataBrands] = useState([])
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice])

    const handleOnChangebox = e => {
        setBrandsSelected({
            ...brandsSelected,
            [e.target.value]: e.target.checked,
        })

        if (e.target.checked) {
            const result = products.filter((productF) => (productF.brand === e.target.value) && (productF.price >= priceRange[0]) && (productF.price <= priceRange[1]))
            console.log(result)
            setDataFilter([
                ...dataFilter,
                ...result
            ])
            setDataBrands([
                ...dataFilter,
                ...result
            ])
        } else {
            const result = dataFilter.filter((productF) => (productF.brand !== e.target.value) && (productF.price >= priceRange[0]) && (productF.price <= priceRange[1]))
            setDataFilter([
                ...result
            ])
            setDataBrands([
                ...result
            ])
        }
    }

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);

        if (dataBrands.length > 0) {
            const result = dataBrands.filter((productF) => (productF.price >= newValue[0]) && (productF.price <= newValue[1]))
            console.log(result)
            setDataFilter([
                ...result
            ])
        } else {
            const result = products.filter((productF) => (productF.price >= newValue[0]) && (productF.price <= newValue[1]))
            console.log(result)
            setDataFilter([
                ...result
            ])
        }

    };

    return (
        <Grid md={2} sm={2} sx={{ pt: 1, pr:1 }} item>
            <Box sx={{ backgroundColor: "secondary.main", borderRadius: 1, display: 'flex',justifyContent:'center',mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, p: 1, color: 'white' }}>FILTRAR</Typography>
            </Box>
            <Box sx={{ padding: 3, border: '1px solid #bebebe', borderRadius: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>MARCA</Typography>
                {brands.map(brand => (
                    <FormControlLabel
                        key={brand}
                        control={
                            <Checkbox
                                onChange={handleOnChangebox}
                                value={brand}
                                name={brand}
                                id={brand}
                                color="secondary"
                            />
                        }
                        label={brand}
                    />

                ))}

                <Typography variant="body1" sx={{ fontWeight: 700, mt: 2, mb: 2 }}>PRECIO</Typography>
                 <Box sx={{ pl:1, pr:1}}>     
                <Slider
                    size="medium"
                    value={priceRange}
                    onChange={handlePriceChange}
                    min={minPrice}
                    max={maxPrice}
                    valueLabelDisplay="auto"
                />
                <Typography variant="subtitle1" sx={{display:'flex', justifyContent: 'center', fontWeight: 700}}>
                    $ {priceRange[0]} - $ {priceRange[1]}
                </Typography>
                </Box> 
            </Box>
        </Grid >
    )
}