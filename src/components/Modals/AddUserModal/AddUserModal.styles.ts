import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "20%",
  height: "85%",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[5],
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  overflow: "auto",
}));

export const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignSelf: "flex-end",
  width: "100%",
  marginTop: "50px",
});
