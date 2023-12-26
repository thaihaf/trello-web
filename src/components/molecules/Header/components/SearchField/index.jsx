import { DEFAULT_COLOR } from "@/constants/constants";
import { Close, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function SearchField() {
  const [searchValue, setSearchValue] = useState();
  return (
    <>
      {" "}
      <TextField
        id="outlined-search"
        label="Search"
        type="text"
        size="small"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        sx={{
          minWidth: 120,
          maxWidth: 200,
          color: DEFAULT_COLOR,
          "& label": { color: DEFAULT_COLOR },
          "& input": { color: DEFAULT_COLOR },
          "& label.Mui-focused": { color: DEFAULT_COLOR },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: DEFAULT_COLOR,
            },
            "&:hover fieldset": {
              borderColor: DEFAULT_COLOR,
            },
            "&.Mui-focused fieldset": {
              borderColor: DEFAULT_COLOR,
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize="15px" sx={{ color: DEFAULT_COLOR }} />
            </InputAdornment>
          ),
          endAdornment: (
            <Close
              fontSize="small"
              sx={{
                color: DEFAULT_COLOR,
                cursor: "pointer",
                display: searchValue?.length > 0 ? "block" : "none",
              }}
              onClick={() => setSearchValue("")}
            />
          ),
        }}
      />
    </>
  );
}
