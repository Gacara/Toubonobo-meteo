import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import shadows from "@mui/material/styles/shadows";

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: () => ({
      width: 200,
      maxHeight: 35,
      transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
      background:
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        'linear-gradient(to right, #FF5F6D, #FF5F6D)',
      '&:hover': {
        transform: 'scale(1.1)',
      },
        borderRadius: 50,
    }),
    label: {
      color: "white",
      textTransform: 'none',
      fontSize: 15,
      fontWeight: 700,
    },
    contained: {
      minHeight: 30,
      boxShadow: shadows[0],
      '&:active': {
        boxShadow: shadows[0],
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);
export default useStyles;