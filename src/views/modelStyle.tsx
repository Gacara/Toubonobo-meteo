import { makeStyles } from "@mui/styles";

 const useStyles = makeStyles({
    root: {
        position: "fixed", /* Sit on top of the page content */
        display: "none", /* Hidden by default */
        width: "100%", /* Full width (cover the whole page) */
        height: "100%", /* Full height (cover the whole page) */
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)", /* Black background with opacity */
        zIndex: 2, /* Specify a stack order in case you're using a different order for other elements */
        cursor: "pointer", /* Add a pointer on hover */
    },
  });

  export default useStyles;