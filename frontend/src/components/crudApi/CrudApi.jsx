import React, { useContext } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { Container, Typography } from "@mui/material";
import CrudContext from "../../context/CrudContext";
import ProductsContext from "../../context/ProductsContext";
// import Loader from "./Loader";
// import Message from "./Message";

const CrudApi = () => {
  const { products } = useContext(ProductsContext)
  const { createData, updateData, dataToEdit, setDataToEdit, deleteData } = useContext(CrudContext);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Panel de Administración de Productos</Typography>
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
    </>
  );
};

export default CrudApi;