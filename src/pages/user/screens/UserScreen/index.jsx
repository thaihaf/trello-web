import Header from "@/components/molecules/Header";
import { Box, Container } from "@mui/material";

export default function UserScreen() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: "primary.main" }}
    >
      <Header />

      <Box
        sx={{
          backgroundColor: "primary.dark",
          alignItems: "center",
          // height: theme => `calc(100vh - ${theme.trello.appBarHeigh})`,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "3000px",
        }}
      >
        Content
      </Box>
    </Container>
  );
}
