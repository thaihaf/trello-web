import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme,
} from "@mui/material";

export default function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = event => {
    setMode(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="mode-select-small-label">Mode</InputLabel>
      <Select
        labelId="mode-select-small-label"
        id="mode-select-small"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <div className="flex items-center justify-center">
            <LightMode fontSize="small" /> Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <div className="flex items-center justify-center ">
            <DarkMode fontSize="small" /> Dark
          </div>
        </MenuItem>
        <MenuItem value="system">
          <div className="flex items-center justify-center">
            <SettingsBrightness fontSize="small" /> System
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
