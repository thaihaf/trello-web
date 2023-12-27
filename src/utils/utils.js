import { HEADER_BAR_BG, MODE_TITLE } from "@/constants/constants";

export const getBackgroundColor = theme =>
  theme?.palette?.mode === MODE_TITLE.darkMode
    ? HEADER_BAR_BG.darkMode
    : HEADER_BAR_BG.whiteMode;
