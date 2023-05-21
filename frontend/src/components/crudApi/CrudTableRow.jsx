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
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(_id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default CrudTableRow;