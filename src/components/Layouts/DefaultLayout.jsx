import { Container } from "@mui/material";
import Header from "../molecules/Header/Header";
import BoardBar from "../molecules/BoardBar/BoardBar";

export default function DefaultLayout({ children }) {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
      }}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 z-[-1] bg-[url('@/assets/bg.jpg')] bg-cover bg-center bg-no-repeat blur-[8px]`}
      />

      <Header />
      <BoardBar />

      {children}
    </Container>
  );
}
