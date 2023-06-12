import { createContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { useNavigate } from 'react-router-dom';

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [productsSale, setProductsSale] = useState(null);
    const [productsSearch, setProductsSearch] = useState(null);
    const [search, setSearch] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let api = helpHttp();
    let url = "http://localhost:3000/api/product";

    useEffect(() => {
        //setLoading(true);
        api
            .get(url)
            .then((res) => {
                console.log(res);
                if (!res.err) {
                    setProducts(res);
                    const filteredProducts = res.filter((product) => product.sale === true);
                    setProductsSale(filteredProducts);
                    setError(null);
                } else {
                    setProducts(null);
                    setError(res);
                }
                //setLoading(false);
            });
    }, [url]);

    const handleChangeSearch = e => {
        setSearch(e.target.value);
        //filtrar(e.target.value);
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        console.log(search)

        if (search === null || search === "") {
            alert("Datos incompletos");
            return;
        }else {
            filtrar(search)
            navigate('/search');
        }
    };

    const filtrar = (searchTerm) => {
        var result = products.filter((element) => {
            if (element.title.toString().toLowerCase().includes(searchTerm.toLowerCase())
                || element.brand.toString().toLowerCase().includes(searchTerm.toLowerCase())
                || element.category.toString().toLowerCase().includes(searchTerm.toLowerCase())
                || element.sport.toString().toLowerCase().includes(searchTerm.toLowerCase())
            ) {
                return element;
            }
        });
        setProductsSearch(result);
    }

    const data = {
        products,
        productsSale,
        productsSearch,
        search,
        handleChangeSearch,
        handleSubmitSearch,
        error,
        loading
    };

    return <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>;
};

export { ProductsProvider };
export default ProductsContext;