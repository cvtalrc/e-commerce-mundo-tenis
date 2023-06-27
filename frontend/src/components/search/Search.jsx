import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 5,
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.12),
    },
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(5),
      width: '100%',
    },
  }));

export default Search;
