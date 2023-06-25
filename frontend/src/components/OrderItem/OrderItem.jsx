import { Grid, List, Box, ListItem, Container, Divider, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import UpdateIcon from '@mui/icons-material/Update';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useRef, useState } from "react";

export default function OrderItem({ order, id }) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const descriptionElementRef = useRef(null);
  console.log(order)

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <List key={id} sx={{ textDecoration: 'none', color: 'black' }}>
      <Box sx={{ padding: 3, textAlign: 'left', border: '1px solid #bebebe', borderRadius: 1 }}>
        <ListItem variant="body1" sx={{ fontWeight: '700', mb: 1 }}>ID #12334412</ListItem>
        <ListItem sx={{ mb: 1 }}>Nombre: Catalina Lorca</ListItem>
        <ListItem sx={{ mb: 1 }}>Tipo de Entrega: Retiro en Tienda</ListItem>
        <ListItem sx={{ mb: 1 }}>Producto/s:  </ListItem>
        <ListItem sx={{ mb: 1 }}>Estado: En curso</ListItem>
        <Box sx={{ display: 'flex', justifyContent: 'right', flexDirection: 'row' }}>
          <Button color="secondary" sx={{ mr: 1 }} variant="outlined">
            <UpdateIcon />
          </Button>
          <Button color="secondary" variant="outlined" onClick={handleClickOpen('paper')}>
            Ver Detalles
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">ID #12334412 </DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                {/* {[...new Array(50)]
                  .map(
                    () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                  )
                  .join('\n')} */}





              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" variant="outlined" onClick={handleClose}>Listo</Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Box>
    </List>

  )
}