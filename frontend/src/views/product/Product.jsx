import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import View from "../../components/Product/View";
import './Product.css'
import { useEffect, useState, useReducer, useContext } from "react";
import { helpHttp } from "../../helpers/helpHttp";
import ProductsContext from "../../context/ProductsContext";

export default function Product() {
    const { sport, category, id } = useParams();
    const { products } = useContext(ProductsContext)

    const product = products.filter((productF) => productF._id === id);

    return (
        <>
            <View product={product[0]} ></View>
        </>
    )
}