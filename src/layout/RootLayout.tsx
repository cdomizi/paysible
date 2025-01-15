import TopBar from "./TopBar";

import { Box, Toolbar } from "@mui/material";

export const RootLayout = () => (
  <>
    <TopBar />
    <Box component="main">
      <Toolbar />
    </Box>
  </>
);
