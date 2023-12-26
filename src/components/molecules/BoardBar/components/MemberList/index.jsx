import { AvatarGroup } from "@mui/material";

import MemberInfo from "../MemberInfo";

export default function MemberList() {
  return (
    <AvatarGroup
      max={6}
      sx={{
        gap: "3px",
        "& .MuiAvatar-root": {
          width: 34,
          height: 34,
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
