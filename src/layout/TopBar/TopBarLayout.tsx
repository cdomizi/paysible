import { AppBar, Toolbar } from "@mui/material";
import { HomeButton } from "./HomeButton";

export const TopBarLayout = () => {
  return (
    <AppBar color="transparent" style={{ alignItems: "center" }}>
      <Toolbar>
        <HomeButton />
      </Toolbar>
    </AppBar>
  );
};
