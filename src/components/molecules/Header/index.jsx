import TrelloIcon from "@/assets/trello.svg?react";
import ModeSelect from "@/components/atoms/ModeSelect/ModeSelect.jsx";
import {
  DEFAULT_COLOR,
  HEADER_BAR_BG,
  MODE_TITLE,
} from "@/constants/constants.js";
import {
  AddToPhotosOutlined,
  Apps,
  HelpOutline,
  Notifications,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Link,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";

import AvatarMenu from "./components/AvatarMenu/index.jsx";
import Recent from "./components/Recent/index.jsx";
import SearchField from "./components/SearchField/index.jsx";
import Workspaces from "./components/Workspaces.jsx/index.jsx";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: "none",
        bgcolor: theme =>
          theme.palette.mode === MODE_TITLE.darkMode
            ? HEADER_BAR_BG.darkMode
            : HEADER_BAR_BG.whiteMode,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: theme => theme.trello.appBarHeigh,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Apps sx={{ color: DEFAULT_COLOR }} />

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
              sx={{ color: DEFAULT_COLOR }}
            />
            <Typography
              variant="span"
              sx={{
                fontSize: "1.7rem",
                fontWeight: "bold",
                color: DEFAULT_COLOR,
              }}
            >
              Trello
            </Typography>
          </Link>

          <Workspaces />
          <Recent />
          <Button
            variant="outlined"
            sx={{
              display: { xs: "none", md: "flex" },
              color: DEFAULT_COLOR,
              border: "none",
              "&:hover": {
                border: "none",
              },
            }}
            startIcon={<AddToPhotosOutlined />}
          >
            Create
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SearchField />
          <ModeSelect />

          <Tooltip title="Notifications">
            <Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
              <Notifications sx={{ color: DEFAULT_COLOR }} />
            </Badge>
          </Tooltip>

          <Tooltip title="Helpers">
            <HelpOutline
              sx={{
                cursor: "pointer",
                display: { xs: "none", md: "flex" },
                color: DEFAULT_COLOR,
              }}
            />
          </Tooltip>

          <AvatarMenu />
        </Box>
      </Container>
    </AppBar>
  );
}
