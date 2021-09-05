import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { PhotoPage } from "./features/dashboard/PhotoPage";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Photo Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <PhotoPage />
    </div>
  );
}

export default App;
