import { createTheme } from '@mui/material/styles';
import 'typeface-lato';

const theme = createTheme({
    palette: {
        primary: {
          main: '#000000',
        },
        secondary: {
          main: '#1565c0',
        },
        error: {
          main: '#d32f2f',
        },
        warning: {
          main: '#fdd835',
        },
        info: {
          main: '#ce93d8',
        },
      },
  typography: {
    fontFamily: 'Lato, sans-serif',
  }
});

export default theme;