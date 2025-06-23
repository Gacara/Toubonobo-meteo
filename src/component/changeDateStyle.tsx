import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
        margin: "0 auto 15px auto",
        textAlign: "center",
        width: "fit-content",
        borderRadius: "10%",
        padding: "10px 20px",
        backgroundColor: "rgb(255, 95, 109)",
        color: "white"
    },
    label: {
        width: "100%",
        padding: "3px",
        backgroundColor: "white",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
    },
    chevron: {
        "& svg": {
            width: "100%",
        },
        margin: "0 5px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        borderRadius: "50%",
        /* padding: 2px; */
        backgroundColor: "white",
    },
    flex: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
    },
  }),
);
export default useStyles;