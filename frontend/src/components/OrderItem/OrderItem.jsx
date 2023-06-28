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
import { BASE_API_URL } from "../../../config";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import StoreIcon from '@mui/icons-material/Store';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';

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
  const [changeStatus, setChangeStatus] = useState(false)
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
    let url = `${BASE_API_URL}/comment`

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

    if (changeStatus === true) {
      let api = helpHttp();
      let url = `${BASE_API_URL}/order/update/${order._id}`;

      let options = {
        body: {
          orderID: order._id,
          status: status
        },
        headers: { "Content-Type": "application/json" }
      }

      api
        .put(url, options)
        .then((res) => {
          //console.log(res);
          if (!res.err) {
            console.log(res)
            setChangeStatus(false)
            Modal(
              'Estado de orden.',
              'Actualización de estado exitoso.',
              'success'
            )
          } else {
            setChangeStatus(false)
            // Modal(
            //   'Estado de orden.',
            //   'Actualización de estado fallido.',
            //   'error'
            // )
          }
          //setLoading(false);
        });
    }

  }, [changeStatus]);

  return (
    <>
      {user !== null && form !== null &&
        <List key={order._id} sx={{ textDecoration: 'none', color: 'black' }}>
          <Box sx={{ padding: 3, textAlign: 'left', border: '1px solid #bebebe', borderRadius: 1 }}>
            <ListItem variant="body1" sx={{ fontWeight: '700', mb: 1 }}>ID #{order._id}</ListItem>

            <ListItem>
              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Nombre: {order.User.name} {order.User.lastName}</Typography>
            </ListItem>
            <ListItem>
              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Tipo de Entrega: {order.Delivery.delivery === 'delivery' ? 'Delivery' : 'Retiro en Tienda'}</Typography>
            </ListItem>
            <ListItem>
              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Productos: {order.Cart[1].Products.length}</Typography>
            </ListItem>
            <ListItem>
              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Estado: {status === 'pendingPayment' ? 'Pendiente de pago' : status}</Typography>
            </ListItem>
           
            <Box sx={{ display: 'flex', justicyContent: 'right', flexDirection: 'row', mt: 2 }}>
              {type !== 'user' ?
                <>

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
                    <MenuItem onClick={() => {
                      setStatus("En curso")
                      setChangeStatus(true)
                      setAnchorEl(null)
                    }} name="En curso" id="En curso" value="En curso">En curso</MenuItem>
                    <MenuItem onClick={() => {
                      setStatus("Entregado")
                      setChangeStatus(true)
                      setAnchorEl(null)
                    }} name="Entregado" id="Entregado" value="Entregado">Entregado</MenuItem>
                  </Menu>
                </>

                : <>
                  {status === 'Entregado' ? <Button color="secondary" size="small" sx={{ mr: 1, ml:1 }} variant="outlined" onClick={handleClickOpenComment}>
                    Agregar comentario
                  </Button> : ''}
                </>

              }

              <Button color="secondary" size="small" variant="outlined" sx={{ mr: 1, ml:1 }} onClick={handleClickOpen('paper')}>
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
                  <Box sx={{ m: 1, p: 2, width: 'auto', border: '1px solid #bebebe', borderRadius: 1 }}>

                    <Grid container>
                      <Grid sm={12} item>

                        {order.Delivery.delivery === 'delivery' ?

                          <List >
                            <ListItem variant="h5" component={Typography} sx={{ mt: 1, fontWeight: 700 }}>
                              <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>Datos de Entrega</Typography>
                              <DeliveryDiningOutlinedIcon sx={{ ml: 2, fontSize: 40 }} />
                            </ListItem>
                            <ListItem>
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Nombre: {order.Delivery.name} {order.Delivery.lastName}</Typography>
                            </ListItem>
                            <ListItem>
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Celular: {order.Delivery.cellNumber}</Typography>
                            </ListItem>
                            <ListItem>
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Correo electrónico: {order.Delivery.email}</Typography>
                            </ListItem>
                            <ListItem>
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Dirección: {order.Delivery.address} </Typography>
                            </ListItem>
                            <ListItem>
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Región: {order.Delivery.region}</Typography>
                            </ListItem>
                            <ListItem>
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Comuna: {order.Delivery.comuna}</Typography>
                            </ListItem>
                            {form.instructions ?
                              <ListItem>
                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Instrucciones de entrega: {order.Delivery.instructions}</Typography>
                              </ListItem>
                              : ''}

                          </List>
                          :
                          <List >
                            <ListItem variant="h5" component={Typography} sx={{ fontWeight: 700 }}>
                              <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>Datos de Retiro</Typography>
                              <StoreIcon sx={{ ml: 2, fontSize: 40 }} />
                            </ListItem>
                            <ListItem>
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Dirección: Vargas Buston 960</Typography>
                            </ListItem>
                            <ListItem>
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Región: Metropolitana </Typography>
                            </ListItem>
                            <ListItem>
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Comuna: San Miguel </Typography>
                            </ListItem>
                            <ListItem>
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Contacto: +56952360764  </Typography>
                            </ListItem>
                          </List>
                        }


                      </Grid>
                      <Grid sm={12} item>

                        <List >
                          <ListItem variant="h5" component={Typography} sx={{ fontWeight: 700 }}>
                            <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>Productos</Typography>
                            <LocalMallOutlinedIcon sx={{ ml: 2, fontSize: 40 }} />
                          </ListItem>
                          {order.Cart[1].Products.map(((product) => (
                            <ListItem>
                              <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                              <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >{product.TitleProduct} x {product.Quantity} = ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>
                            </ListItem>

                          )))}

                          <ListItem>
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                            <Typography variant="h6" sx={{ ml: 2, fontSize: 18, fontWeight: 700 }} >Total: ${order.Cart[2].Total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>
                          </ListItem>


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
                    sx={{ mt: 2 }}
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
                  <Box sx={{ mr: 2, mb: 2 }}>
                    <Button color="secondary" variant="outlined" size="small" onClick={addComment} sx={{ mr: 1 }}>Añadir</Button>
                    <Button color="secondary" variant="outlined" size="small" onClick={handleCloseComment}>Cancelar</Button>
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