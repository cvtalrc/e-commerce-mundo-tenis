import { createContext, useContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import ProductsContext from "./ProductsContext";

const CrudContext = createContext();

const CrudProvider = ({ children }) => {
    const {products, setProducts} = useContext(ProductsContext)
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = "http://localhost:3000/api/product";

    useEffect(() => {
        //setLoading(true);
        helpHttp()
            .get(url)
            .then((res) => {
                console.log(res);
                if (!res.err) {
                    //setDb(res);
                    setProducts(res);
                    setError(null);
                } else {
                    //setDb(null);
                    setProducts(null);
                    setError(res);
                }
                //setLoading(false);
            });
    }, [url]);

    const createData = (data) => {
        console.log(data);

        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };

        api.post(url, options).then((res) => {
            console.log(res);
            if (!res.err) {
                setProducts([...products, res]);
            } else {
                setError(res);
            }
        });
    };

    const updateData = (data) => {
        let endpoint = `${url}/update/${data._id}`;
        console.log(endpoint);

        const updatedObject = {
            ...data, // Crear una copia del objeto original
            titleC: data.title, // Asignar nuevo nombre a la variable
            brandC: data.brand,
            priceC: data.price,
            descriptionC: data.description,
            stockC: data.stock,
            sportC: data.sport,
            categoryC: data.category,
            imgUrlC: data.imgUrl,
            saleC: data.sale,
            percentageSaleC: data.percentageSale,
        };

        // Opcionalmente, eliminar las variables originales
        delete updatedObject.title;
        delete updatedObject.brand;
        delete updatedObject.price;
        delete updatedObject.description;
        delete updatedObject.stock;
        delete updatedObject.sport;
        delete updatedObject.category;
        delete updatedObject.imgUrl;
        delete updatedObject.sale;
        delete updatedObject.percentageSale;

        let options = {
            body: updatedObject,
            headers: { "content-type": "application/json" },
        };

        api.put(endpoint, options).then((res) => {
            //console.log(res);
            if (!res.err) {
                console.log(data)
                let newData = products.map((el) => (el._id === data._id ? data : el));
                setProducts(newData);
            } else {
                setError(res);
            }
        });
    };

    const deleteData = (_id) => {
        let isDelete = window.confirm(
            `¿Estás seguro de eliminar el registro con el _id '${_id}'?`
        );

        if (isDelete) {
            let endpoint = `${url}/${_id}`;
            console.log(endpoint);
            let options = {
                headers: { "content-type": "application/json" },
            };

            api.del(endpoint, options).then((res) => {
                console.log(res.err);
                if (!res.err) {
                    let newData = products.filter((el) => el._id !== _id);
                    setProducts(newData);
                } else {
                    setError(res);
                }
            });

        } else {
            return;
        }
    };

    const data = {
        products,
        error,
        loading,
        createData,
        dataToEdit,
        setDataToEdit,
        updateData,
        deleteData,
    };

    return <CrudContext.Provider value={data}>{children}</CrudContext.Provider>;
};

export { CrudProvider };
export default CrudContext;