import { getBackgroundColor } from "@/utils/utils";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AddCard,
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  DeleteForever,
  ExpandMore,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";

import AddACart from "../AddACart/AddACart";
import Card from "../Card/Card";

export default function Column({ column }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  const dndKitColumnStyle = {
    // touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    cursor: "default",
    opacity: isDragging ? "0.5" : "1",
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <SortableContext
      items={column?.cards?.map(c => c?._id)}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
        <Box
          {...listeners}
          sx={{
            maxHeight: "100%",
            width: "300px",
            minWidth: "300px",
            bgcolor: theme => getBackgroundColor(theme),
            p: "0 5px",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
        >
          <Box
            sx={{
              padding: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              flexWrap: "nowrap",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {column.title}
            </Typography>

            <ExpandMore
              sx={{
                color: "text.primary",
                cursor: "pointer",
                padding: "3px",
                fontSize: "30px",
                transition: "all 0.3s",
                transform: open ? "rotate(180deg)" : "rotate(0)",
              }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCard fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForever fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              width: "100%",
              bgcolor: "transparent",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              overflowY: "auto",
              p: "0 5px",
            }}
          >
            {column?.cards?.map(card => (
              <Card key={card._id} card={card} />
            ))}
          </Box>

          <AddACart />
        </Box>
      </div>
    </SortableContext>
  );
}
