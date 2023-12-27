import TrelloIcon from "@/assets/trello.svg?react";
import ModeSelect from "@/components/atoms/ModeSelect/ModeSelect.jsx";
import { DEFAULT_COLOR } from "@/constants/constants.js";
import { getBackgroundColor } from "@/utils/utils.js";
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
import Workspaces from "./components/Workspaces/Workspaces";
import Recent from "./components/Recent/Recent";
import SearchField from "./components/SearchField/SearchField";
import AvatarMenu from "./components/AvatarMenu/AvatarMenu";

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        bgcolor: theme => getBackgroundColor(theme),
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
