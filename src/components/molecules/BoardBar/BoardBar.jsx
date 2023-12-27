import { BOARD_BAR_BG } from "@/constants/constants";
import { MENU_BOARDBAR_LEFT_STYLE } from "@/constants/style.constants";
import {
  AddToDrive,
  Addchart,
  FilterList,
  PersonAdd,
  SpaceDashboard,
  VpnLock,
} from "@mui/icons-material";
import { AppBar, Box, Button, Chip, Container } from "@mui/material";

import MemberList from "./components/MemberList/MemberList";

export default function BoardBar() {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: BOARD_BAR_BG,
        top: theme => theme.trello.appBarHeigh,
        boxShadow: "none",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          width: "100%",
          height: theme => theme.trello.boardBarHeight,
          display: "flex",
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
          <Chip
            icon={<SpaceDashboard />}
            label="Trello App Board"
            variant="outlined"
            onClick={() => {}}
            sx={MENU_BOARDBAR_LEFT_STYLE}
          />
          <Chip
            icon={<VpnLock />}
            label="Public/Private Workspaces"
            variant="outlined"
            onClick={() => {}}
            sx={MENU_BOARDBAR_LEFT_STYLE}
          />
          <Chip
            icon={<AddToDrive />}
            label="Add to Google Drive"
            variant="outlined"
            onClick={() => {}}
            sx={MENU_BOARDBAR_LEFT_STYLE}
          />
          <Chip
            icon={<FilterList />}
            label="Filter"
            variant="outlined"
            onClick={() => {}}
            sx={MENU_BOARDBAR_LEFT_STYLE}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "#282828",
              border: "none",
              "&:hover": {
                border: "none",
              },
            }}
            startIcon={<Addchart />}
          >
            Add new column
          </Button>
          <Button
            variant="outlined"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "#282828",
              border: "none",
              "&:hover": {
                border: "none",
              },
            }}
            startIcon={<PersonAdd />}
          >
            Invite
          </Button>

          <MemberList maxSize={6} />
        </Box>
      </Container>
    </AppBar>
  );
}
