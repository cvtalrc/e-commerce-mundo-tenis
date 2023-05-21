import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CrudTableRow from "./CrudTableRow";
import { Button, Container, Typography } from '@mui/material';

// const CrudTable = ({ data, setDataToEdit, deleteData }) => {
//   return (
//     <div>
//       <h3>Tabla de Datos</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Nombre</th>
//             <th>Marca</th>
//             <th>Precio</th>
//             <th>Descripción</th>
//             <th>Talla</th>
//             <th>Cantidad</th>
//             <th>Deporte</th>
//             <th>Categoría</th>
//             <th>Imagen</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((el) => (
//               <CrudTableRow
//                 key={el._id}
//                 el={el}
//                 setDataToEdit={setDataToEdit}
//                 deleteData={deleteData}
//               />
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">Sin datos</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CrudTable;


const CrudTable = ({ data, setDataToEdit, deleteData }) => {
  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Nombre', width: 130 },
    { field: 'brand', headerName: 'Marca', width: 130 },
    { field: 'price', headerName: 'Precio', type: 'number', width: 100 },
    { field: 'description', headerName: 'Descripción', width: 130 },
    { field: 'size', headerName: 'Talla', width: 130 },
    { field: 'quantity', headerName: 'Cantidad', width: 130 },
    { field: 'sport', headerName: 'Deporte', width: 130 },
    { field: 'category', headerName: 'Categoría', width: 130 },
    { field: 'imgUrl', headerName: 'Imagen', width: 130 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      renderCell: ({ row }) =>
        <Button color="secondary" variant="outlined" onClick={() => setDataToEdit(row)}>Editar</Button>,
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      renderCell: ({ row }) =>
        <Button color="secondary" variant="outlined" onClick={() => deleteData(row._id)}>Eliminar</Button>,
    }

  ];

  const rows = data;
  console.log(rows);
  return (
    <>
      <Typography variant="h4" sx={{mb:2}}>Stock de Productos</Typography>
      <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
        {rows.length > 0 ?
          <DataGrid
            getRowId={(row) => row._id}
            rows={rows.length > 0 ? rows : "Sin datos"}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          >
            <Button onClick={() => setDataToEdit(el)}>Editar</Button>
            <Button onClick={() => deleteData(_id)}>Eliminar</Button>
          </DataGrid> :
          <Typography> Sin datos </Typography>}
      </div >
    </>
  );
}

export default CrudTable;