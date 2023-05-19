import { Button, Container, Grid, List, Typography } from "@mui/material";

export default function View(id) {
  // const [product, setProduct] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  // let api = helpHttp();
  // let url = "http://localhost:3000/api/Product/all"

  // useEffect(() => {
  //   setLoading(true);
  //   api
  //     .get(url)
  //     .then((res) => {
  //       //console.log(res);
  //       if (!res.err) {
  //         setProduct(res);
  //         setError(null);
  //       } else {
  //         setProduct(null);
  //         setError(res);
  //       }
  //       setLoading(false);
  //     });
  // }, [url]);

  return (
    <Container sx={{ pt: 10, pb: 10 }}>
      <Grid container>
        <Grid item md={6}>
          <img src="https://locosporeltenis.cl/12168-thickbox_default/tarro-prince-padel-x3.jpg"></img>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Tarro PRINCE PADEL X3</Typography>
          <Typography variant="h6" >Prince</Typography>
          <Typography>La pelota PRINCE PADEL tiene excelente calidad y consistencia. Su color amarillo óptico la hace ideal para el entrenamiento.</Typography>
          <Typography variant="h5" bgcolor="secondary" >$ 4990</Typography>
          <Button color="secondary" variant="text">Agregar al carro</Button>
          <Button>contador</Button>
        </Grid>
      </Grid>
    </Container>
  )
}