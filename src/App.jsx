import { Box, Container } from "@mui/material";
import ModeToggle from "./components/ModeToggle";
import Users from "./pages/users/Users";
function App() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: "primary.main" }}
    >
      <Box
        sx={{
          backgroundColor: "primary.light",
          width: "100%",
          height: (theme) => theme.trello.appBarHeigh,
          padding: "5px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Users />
      </Box>
      <Box
        sx={{
          backgroundColor: "primary.dark",
          width: "100%",
          height: (theme) => theme.trello.boardBarHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModeToggle />
      </Box>
      <Box
        sx={{
          backgroundColor: "primary.dark",
          alignItems: "center",
          height: (theme) =>
            `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeigh})`,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        Content
      </Box>
    </Container>
  );
}

export default App;
