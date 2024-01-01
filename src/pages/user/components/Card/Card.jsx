import ButtonIcon from "@/components/atoms/ButtonIcon/ButtonIcon";
import MemberList from "@/components/molecules/BoardBar/components/MemberList/MemberList";
import { DEFAULT_COLOR } from "@/constants/constants";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AccessTime,
  AttachFile,
  ChatBubbleOutline,
  Subject,
  TaskAlt,
} from "@mui/icons-material";
import { Box, Modal, Tooltip, Typography } from "@mui/material";
import React from "react";

export default function Card({ card }) {
  const [open, setOpen] = React.useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { ...card } });

  const dndKitCardStyle = {
    // touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? "0.5" : "1",
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: DEFAULT_COLOR,
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          cursor: "pointer",
        }}
        onClick={handleOpen}
        ref={setNodeRef}
        style={dndKitCardStyle}
        {...attributes}
        {...listeners}
      >
        {card?.cover && (
          <Box
            sx={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              overflow: "hidden",
            }}
          >
            <img
              src={`${card.cover}?w=161&fit=crop&auto=format`}
              alt={card.title}
              loading="lazy"
            />
          </Box>
        )}

        <Box
          sx={{
            bgcolor: "green",
            height: "9px",
            width: `calc(100% - 17px * 2)`,
            marginX: "17px",
            marginTop: "10px",
            borderRadius: "10px",
          }}
        />

        <Typography
          sx={{
            paddingX: "17px",
            paddingY: "7px",
            color: "#546078",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {card?.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            paddingLeft: "17px",
            paddingRight: "10px",
            paddingBottom: "7px",
            gap: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "15px",
              rowGap: "4px",
              flexWrap: "wrap",
            }}
          >
            {card?.description && (
              <Tooltip title="Thẻ đã có mô tả">
                <ButtonIcon
                  icon={<Subject />}
                  styles={{
                    ".MuiSvgIcon-root": {
                      fontSize: "20px",
                    },
                  }}
                  disableTouch
                />
              </Tooltip>
            )}

            {!!card?.comments?.length && (
              <Tooltip title="Bình luận">
                <ButtonIcon
                  icon={<ChatBubbleOutline />}
                  value={card?.comments?.length}
                  disableTouch
                />
              </Tooltip>
            )}

            {!!card?.attachments?.length && (
              <Tooltip title="Tệp đính kèm">
                <ButtonIcon
                  icon={<AttachFile sx={{ transform: "rotate(45deg)" }} />}
                  value={card?.attachments?.length}
                  disableTouch
                />
              </Tooltip>
            )}

            {card?.deadTime && (
              <Tooltip title="Ngày hết hạn">
                <ButtonIcon
                  icon={<AccessTime />}
                  value={"22/11/2003"}
                  disableTouch
                />
              </Tooltip>
            )}

            {card?.jobs && (
              <Tooltip title="Số lượng công việc">
                <ButtonIcon icon={<TaskAlt />} value={"6/13"} disableTouch />
              </Tooltip>
            )}
          </Box>

          {!!card?.memberIds?.length && (
            <MemberList
              sizeAvt={27}
              total={card.memberIds.length}
              maxSize={3}
              gap={10}
            />
          )}
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
