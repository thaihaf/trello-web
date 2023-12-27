import { Button } from "@mui/material";
import React from "react";

const ButtonIcon = React.forwardRef(function ButtonIcon(
  { icon, value, styles, disableTouch, ...rest },
  ref
) {
  return (
    <Button
      variant="outlined"
      disableRipple={disableTouch}
      ref={ref}
      startIcon={icon}
      sx={{
        color: "#676e79",
        border: "none",
        "&:hover": {
          border: "none",
          backgroundColor: "transparent",
        },
        padding: 0,
        minWidth: "fit-content",
        backgroundColor: "transparent",
        ".MuiButton-startIcon": {
          marginRight: "5px",
        },
        ".MuiSvgIcon-root": {
          fontSize: "18px",
        },
        ...styles,
      }}
      {...rest}
    >
      {value}
    </Button>
  );
});

export default ButtonIcon;
