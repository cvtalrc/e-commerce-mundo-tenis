import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        transition: theme.transitions.create('width'),
        width: 60,
        [theme.breakpoints.up('sm')]: {
            width: '40vw',
          },
    },
}));

export default StyledInputBase;