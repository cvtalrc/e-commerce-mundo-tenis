import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CrudTableRow from "./CrudTableRow";
import { Button, Container, Typography } from '@mui/material';

const CrudTable = ({ data, setDataToEdit, deleteData }) => {
  const pageSizeOptions = [5, 10, 20];

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Nombre', width: 130 },
    { field: 'brand', headerName: 'Marca', width: 100 },
    { field: 'price', headerName: 'Precio', type: 'number', width: 80 },
    { field: 'description', headerName: 'Descripción', width: 130 },
    {
      field: 'stock',
      headerName: 'Tallas y Cantidades',
      width: 200,
      renderCell: ({ value }) => {
        const stockItems = value.map(item => `${item.size}: ${item.quantity}`).join(', ');
        return <span>{stockItems}</span>;
      }
    },
    { field: 'sport', headerName: 'Deporte', width: 100 },
    { field: 'category', headerName: 'Categoría', width: 110 },
    { field: 'imgUrl', headerName: 'Imagen', width: 130 },
    { field: 'sale', headerName: 'Oferta', width: 130 },
    { field: 'percentageSale', headerName: 'Porcentaje de oferta', width: 130 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      renderCell: ({ row }) =>
        <Button color="secondary" variant="contained" onClick={() => setDataToEdit(row)}>Editar</Button>,
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      renderCell: ({ row }) =>
        <Button color="secondary" variant="contained" onClick={() => deleteData(row._id)}>Eliminar</Button>,
    }

  ];

  const rows = data;
  console.log(rows);
  const sizes = 0;

  return (
    <>
      <Typography variant="h5" sx={{mb:2}}>Stock de Productos</Typography>
      <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
        {rows.length > 0 ?
          <DataGrid
            getRowId={(row) => row._id}
            rows={rows.length > 0 ? rows : "Sin productos"}
            columns={columns}
            pageSizeOptions={pageSizeOptions}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
          >
            {/* <Button onClick={() => setDataToEdit(el)}>Editar</Button>
            <Button onClick={() => deleteData(_id)}>Eliminar</Button> */}
          </DataGrid> 
          :
          <Typography> Sin productos </Typography>}
      </div >
    </>
  );
}

export default CrudTable;