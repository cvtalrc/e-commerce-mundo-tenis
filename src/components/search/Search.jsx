import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(3),
    marginLeft: 40,
    width: '70%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(15),
      width: '15%',
    },
  }));

export default Search;
