import { AvatarGroup } from "@mui/material";
import MemberInfo from "../MemberInfo/MemberInfo";

export default function MemberList({ sizeAvt = 34, maxSize = 3, gap = 5 }) {
  return (
    <AvatarGroup
      max={maxSize}
      sx={{
        gap: `${gap}px`,
        "& .MuiAvatar-root": {
          width: sizeAvt,
          height: sizeAvt,
          fontSize: "13px",
          border: "none",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "#d5d8dd",
          },
          cursor: "pointer",
          color: "black",
        },
      }}
    >
      <MemberInfo />
      <MemberInfo />
      <MemberInfo />
      <MemberInfo />
      <MemberInfo />
      <MemberInfo />
      <MemberInfo />
      <MemberInfo />
      <MemberInfo />
      <MemberInfo />
      <MemberInfo />
    </AvatarGroup>
  );
}
