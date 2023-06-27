import { Grid, List, Box, ListItem, Container, Divider, Button, Typography, TextField, Menu, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import UpdateIcon from '@mui/icons-material/Update';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useRef, useState, useContext } from "react";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { helpHttp } from "../../helpers/helpHttp";
import { Modal } from "../Alerts/Modal";
import UserContext from "../../context/UserContext";

export default function OrderItem({ order, type }) {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0);
  const [scroll, setScroll] = useState('paper');
  const [form, setForm] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(order.Status)
  const openButtonMenu = Boolean(anchorEl);

  console.log(order)
  console.log(user)

  useEffect(() => {
    if (user !== null) {
      console.log(user)
      const initialForm = {
        Author: user.name,
        Content: "",
        Stars: ""
      }
      setForm(initialForm)

    }
  }, [user])


  const descriptionElementRef = useRef(null)

  const handleRatingChange = (e, value) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setRating(value);
    console.log(value)
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenComment = () => {
    setOpenComment(true);
  };

  const handleCloseComment = () => {
    setOpenComment(false);
  };

  const addComment = () => {
    let api = helpHttp();
    let url = "http://localhost:3000/api/comment"

    console.log(form)

    let options = {
      body: form,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`,
        'Content-type': 'application/json'
      }
    }

    api
      .post(url, options)
      .then((res) => {
        console.log(res);
        if (!res.err) {
          console.log(res)
          setOpenComment(false);
          setForm(initialForm)
          Modal(
            'Sección de comentarios',
            'Tu comentario se agregó exitosamente.',
            'success',
            ''
          )

        } else {
          console.error(res.err)
        }
      })
      .catch(e => {
        console.error(e);
      });


  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = (e) => {
    console.log(e.target.value)
    console.log(e.target.name)
    setStatus(e.target.value);
    console.log(status)
  };

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    //actualizar estado con la api
  }, [status]);

  return (
    <>
      {user !== null && form !== null &&
        <List key={order._id} sx={{ textDecoration: 'none', color: 'black' }}>
          <Box sx={{ padding: 3, textAlign: 'left', border: '1px solid #bebebe', borderRadius: 1 }}>
            <ListItem variant="body1" sx={{ fontWeight: '700', mb: 1 }}>ID #{order._id}</ListItem>
            <ListItem sx={{ mb: 1 }}>Nombre: {order.User.name} {order.User.lastName}</ListItem>
            <ListItem sx={{ mb: 1 }}>Tipo de Entrega: {order.Delivery.delivery}</ListItem>
            <ListItem sx={{ mb: 1 }}>Productos: {order.Cart[1].Products.length} </ListItem>
            <ListItem sx={{ mb: 1 }}>Estado: {status}</ListItem>
            <Box sx={{ display: 'flex', justicyContent: 'right', flexDirection: 'row', mt: 2 }}>
              {type !== 'user' ?
                <>
                  {/* <Button color="secondary" size="small" sx={{ mr: 1 }} variant="outlined">
                    <UpdateIcon />
                  </Button> */}

                  <Button
                    color="secondary" 
                    size="small" 
                    sx={{ mr: 1 }} 
                    variant="outlined"
                    id="basic-button"
                    aria-controls={openButtonMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openButtonMenu ? 'true' : undefined}
                    onClick={handleClickMenu}
                  >
                    <UpdateIcon />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openButtonMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={() => {setStatus("En curso") 
                    setAnchorEl(null)}} name="En curso" id="En curso" value="En curso">En curso</MenuItem>
                    <MenuItem onClick={() => {setStatus("Entregado")
                  setAnchorEl(null)}} name="Entregado" id="Entregado" value="Entregado">Entregado</MenuItem>
                  </Menu>
                </>

                :

                <Button color="secondary" size="small" variant="outlined" onClick={handleClickOpenComment}>
                  Agregar comentario
                </Button>

              }

              <Button color="secondary" size="small" variant="outlined" onClick={handleClickOpen('paper')}>
                Ver Detalles
              </Button>

              <Dialog //detalles
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">ID #{order._id} </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                  <Box sx={{ m: 1, width: 'auto', border: '1px solid #bebebe', borderRadius: 1 }}>

                    <Grid container>
                      <Grid sm={12} item>

                        {order.Delivery.delivery === 'delivery' ?

                          <List >
                            <ListItem component={Typography} sx={{ fontWeight: 700 }}>Datos de Entrega</ListItem>
                            <ListItem >{order.Delivery.name} {order.Delivery.lastName}</ListItem>
                            <ListItem >{order.Delivery.cellNumber}</ListItem>
                            <ListItem >{order.Delivery.email}</ListItem>
                            <ListItem >{order.Delivery.address}</ListItem>
                            <ListItem >{order.Delivery.region}</ListItem>
                            <ListItem >{order.Delivery.comuna}</ListItem>
                            {order.Delivery.instructions.length > 0 ? <ListItem >{order.Delivery.instructions}</ListItem> : ''}

                          </List>
                          : ''}


                      </Grid>
                      <Grid sm={12} item>

                        <List >
                          <ListItem component={Typography} sx={{ fontWeight: 700 }}>Productos</ListItem>
                          {order.Cart[1].Products.map(((product) => (
                            <ListItem key={product._id}>{product.TitleProduct} {product.size !== '' ? <Typography>{product.size}</Typography> : ''} x {product.Quantity} = {product.price}</ListItem>

                          )))}
                          <ListItem>{order.Cart[2].Total}</ListItem>


                        </List>

                      </Grid>
                    </Grid>
                  </Box>

                </DialogContent>
                <DialogActions>
                  <Button color="secondary" variant="outlined" sx={{ mr: 1 }} onClick={handleClose}>Listo</Button>
                </DialogActions>
              </Dialog>

              <Dialog open={openComment} onClose={handleCloseComment}>
                <DialogTitle>Añadir Comentario</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Por favor, déjanos tu comentario y la puntuación que le das al producto.
                  </DialogContentText>

                  <Rating
                    sx={{ mt: 2 }}
                    name="Stars"
                    type="number"
                    id="Stars"
                    value={form.Stars}
                    onChange={handleRatingChange}
                    emptyIcon={<StarIcon />}
                    icon={<StarIcon sx={{ color: "gold" }} />}
                  />

                  <TextField
                    sx={{ mt: 2, mb: 2 }}
                    autoFocus
                    color="secondary"
                    margin="dense"
                    id="Content"
                    label="Comentario"
                    type="text"
                    name="Content"
                    multiline
                    rows={4}
                    fullWidth
                    onChange={handleChange}
                    value={form.Content}
                  />

                </DialogContent>
                <DialogActions>
                  <Box sx={{ mr: 2 }}>
                    <Button onClick={handleCloseComment}>Cancelar</Button>
                    <Button onClick={addComment}>Añadir</Button>
                  </Box>
                </DialogActions>
              </Dialog>

            </Box>
          </Box>
        </List>
      }
    </>
  )
}