import ColumnWrapper from "@/pages/user/components/ColumnWrapper/ColumnWrapper";
import { Box } from "@mui/material";

export default function UserScreen() {
  return (
    <Box
      sx={{
        height: theme =>
          `calc(100vh - ${theme.trello.appBarHeigh} - ${theme.trello.boardBarHeight} - 10px)`,
        display: "flex",
        alignItems: "start",
        width: "100%",
        bgcolor: "transparent",
        padding: "15px",
        gap: "15px",
        overflowX: "auto",
      }}
    >
      <ColumnWrapper />
      <ColumnWrapper />
      <ColumnWrapper />
      <ColumnWrapper />
      <ColumnWrapper />
      <ColumnWrapper />
      <ColumnWrapper />
      <ColumnWrapper />
      <ColumnWrapper />
      <ColumnWrapper />
    </Box>
  );
}
