import React, { useEffect, useReducer, useState } from "react";
import { TYPES } from "../../actions/crudActions";
import { helpHttp } from "../../helpers/helpHttp";
import { crudInitialState, crudReducer } from "../../reducers/crudReducer";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { Container, Typography } from "@mui/material";
// import Loader from "./Loader";
// import Message from "./Message";

const CrudApi = () => {
  const [state, dispatch] = useReducer(crudReducer, crudInitialState);
  const { products } = state;
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
          dispatch({ type: TYPES.READ_ALL_DATA, payload: res });
          setError(null);
        } else {
          //setDb(null);
          dispatch({ type: TYPES.NO_DATA });
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
        //setProducts([...products, res]);
        dispatch({ type: TYPES.CREATE_DATA, payload: res });
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/update`;
    console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        console.log(data)
        // let newData = products.map((el) => (el._id === data._id ? data : el));
        // setProducts(newData);
        dispatch({ type: TYPES.UPDATE_DATA, payload: data });
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
          // let newData = products.filter((el) => el._id !== _id);
          // setProducts(newData);
          dispatch({ type: TYPES.DELETE_DATA, payload: _id });
        } else {
          setError(res);
        }
      });

    } else {
      return;
    }
  };

   return (
    <Container  sx={{mt: 6, mb: 6}}>
      <Typography variant="h4" sx={{mb: 4, fontWeight: 700}}>Panel de Administración de Productos</Typography>
      <article className="gr_id-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {/* {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )} */}
        {products && (
          <CrudTable
            key={products}
            data={products}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </article>
    </Container>
  );
};

export default CrudApi;