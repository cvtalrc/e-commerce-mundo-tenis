import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 0,
      marginTop: 0,
      minWidth: '15%',
      color:
        theme.palette.mode === 'light' ? '#000' : theme.palette.grey[300],
      boxShadow:
        'rgb(25, 137, 243) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '8px 0',
        backgroundColor: alpha(theme.palette.common.white, 0.50),
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(0),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.secondary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  

export default StyledMenu;