import { makeStyles, Theme, createStyles } from "@material-ui/core";

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
        margin: "0 auto 15px auto",
        textAlign: "center",
        width: "fit-content",
        fontSize: "3rem",
        borderRadius: "10%",
        padding: "10px 20px",
        backgroundColor: "rgb(255, 95, 109)",
        color: "white"
    },
    label: {
        height: "55px",
        width: "400px",
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
        fontSize: "3rem",
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