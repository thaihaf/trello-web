import BoardBar from "@/components/molecules/BoardBar";
import Header from "@/components/molecules/Header";
import { Box, Container } from "@mui/material";

export default function UserScreen() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
      }}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 z-0 bg-[url('@/assets/bg.jpg')] bg-cover bg-center bg-no-repeat blur-[8px]`}
      />
      <Header />
      <BoardBar />

      <Box
        sx={{
          alignItems: "center",
          height: theme =>
            `calc(100vh - ${theme.trello.appBarHeigh} - ${theme.trello.boardBarHeight})`,
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
