import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import View from "../../components/Product/View";
import './Product.css'
import { useEffect, useState, useReducer } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import ProductsContext from "../../context/ProductsContext";

//realizar búsqueda a db del producto en específico 
export default function Product() {
    const { sport, category, id } = useParams();
    const { products } = useContext(ProductsContext)
    // console.log(sport)
    // console.log(category)
    // console.log(id)

    // const [product, setProduct] = useState([]);
    // // const [error, setError] = useState(null);
    // // const [loading, setLoading] = useState(false);
    // let api = helpHttp();
    // let url = `http://localhost:3000/api/product/${id}`
    // console.log(url)
  
    // useEffect(() => {
    //   // setLoading(true);
    //   console.log(product)
    //   api
    //     .get(url)
    //     .then((res) => {
    //       console.log(res);
    //       if (!res.err) {
    //         setProduct(res);
    //         // setError(null);
    //       } else {
    //         setProduct(null);
    //         // setError(res);
    //       }
    //       // setLoading(false);
    //     });
    // }, [url]);

    const product = products.filter((productF) => productF._id === id);
    


    return (
        <>
            {/* <Typography variant="h4">Deporte: {sport}</Typography>
            <Typography variant="h4">Categoría: {category}</Typography>
            <Typography variant="h4">id: {id}</Typography> */}
            <View product={product[0]} ></View>
        </>
    )
}