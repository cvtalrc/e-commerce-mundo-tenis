import { createContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [productsSale, setProductsSale] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const data = {
        products,
        productsSale,
        error,
        loading
    };

    return <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>;
};

export { ProductsProvider };
export default ProductsContext;