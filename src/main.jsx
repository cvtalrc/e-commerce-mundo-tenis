import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './index.css';
import Layout from './layout.jsx'
import theme from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Layout />
    </ThemeProvider>
  </BrowserRouter>
);