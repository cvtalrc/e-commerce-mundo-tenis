import { Button } from "@mui/material";
import React from "react";

const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
  let {_id, title, brand, price, description, size, quantity, sport, category, imgUrl} = el;

  return (
    <tr>
      <td>{title}</td>
      <td>{brand}</td>
      <td>{price}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{sport}</td>
      <td>{size}</td>
      <td>{quantity}</td>
      <td>{imgUrl}</td>
      <td>
        <Button color="secondary" variant="outlined" size="small" onClick={() => setDataToEdit(el)}>Editar</Button>
        <Button color="secondary" variant="outlined" size="small" onClick={() => deleteData(_id)}>Eliminar</Button>
      </td>
    </tr>
  );
};

export default CrudTableRow;