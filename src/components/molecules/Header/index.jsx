import TrelloIcon from "@/assets/trello.svg?react";
import ModeSelect from "@/components/atoms/ModeSelect/ModeSelect.jsx";
import { Apps, HelpOutline, Notifications } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Link,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";

import AvatarMenu from "./components/AvatarMenu/index.jsx";
import Recent from "./components/Recent/index.jsx";
import Workspaces from "./components/Workspaces.jsx/index.jsx";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "primary.contrastText", overflow: "auto" }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            width: "100%",
            height: theme => theme.trello.appBarHeigh,
            padding: "5px",
            display: "flex",
            justifyContent: "between",
          }}
        >
          <Box
            sx={{
              padding: "5px",
              display: "flex",
              justifyContent: "between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Apps sx={{ color: "primary.main" }} />

            <Link
              href="#"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
              }}
            >
              <SvgIcon
                inheritViewBox
                component={TrelloIcon}
                sx={{ color: "primary.main" }}
              />
              <Typography
                variant="span"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "primary.main",
                }}
              >
                Trello
              </Typography>
            </Link>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Workspaces />
              <Recent />
              <Button variant="outlined">Create</Button>
            </Box>
          </Box>

          <Box
            sx={{
              padding: "5px",
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginLeft: "auto",
            }}
          >
            <TextField
              id="outlined-search"
              label="Search"
              type="search"
              size="small"
              sx={{ minWidth: 120 }}
            />
            <ModeSelect />

            <Badge color="secondary" variant="dot" sx={{ cursor: "pointer" }}>
              <Notifications sx={{ color: "primary.main" }} />
            </Badge>

            <HelpOutline
              sx={{
                cursor: "pointer",
                display: { xs: "none", md: "flex" },
                color: "primary.main",
              }}
            />

            <AvatarMenu />
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
