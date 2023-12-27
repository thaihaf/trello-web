import ButtonIcon from "@/components/atoms/ButtonIcon/ButtonIcon";
import { Add } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import React from "react";

export default function AddACart() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ paddingY: "10px" }}>
        <ButtonIcon
          icon={<Add />}
          value={"Add a cart"}
          styles={{
            "&:hover": {
              border: "none",
              backgroundColor: "transparent",
              ".MuiSvgIcon-root": {
                transform: "rotate(90deg)",
              },
            },
            ".MuiSvgIcon-root": {
              fontSize: "18px",
              transition: "all 0.4s",
            },
            paddingX: "15px",
            paddingY: "5px",
            borderRadius: "20px",
          }}
          onClick={handleOpen}
        />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
