import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import PanToolIcon from "@mui/icons-material/PanTool";
import { makeStyles } from "@material-ui/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 485,
  borderRadius: 5,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles(() => ({
  img: {
    marginTop: -40,
    marginBottom: -20,
    marginLeft: 130,
    width: 170,
    height: 170,
  },
}));

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const classes = useStyles();
  return (
    <div>
      <Button onClick={handleOpen} color="secondary" variant="contained">
        Post Question
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={"/images/coming-soon.png"}
            alt="avatar"
            className={classes.img}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mx: 1 }}
          >
            Wait!! This feature will implement very soon.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, mx: 12 }}>
            Thank You for your patience !!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
