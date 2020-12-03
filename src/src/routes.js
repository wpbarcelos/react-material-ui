import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";

import Sidebar from "./components/Sidebar";
import Osticket from "./pages/Osticket";
import OsticketDataGrid from "./pages/OsticketDataGrid";
import About from "./pages/About";

export default function App() {
  return (
    <Grid container style={{ paddingRight: 20 }}>
      <Router>
        <Grid item md={2} style={{ paddingTop: 75 }}>
          <Sidebar />
        </Grid>
        <Grid
          item
          md={10}
          style={{
            paddingLeft: 20,
            paddingTop: 75,
            backgroundColor: "#f3f3f3",
            minHeight: "100vh",
          }}
        >
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/datagrid">
              <OsticketDataGrid />
            </Route>
            <Route path="/" exact>
              <Osticket />
            </Route>
          </Switch>
        </Grid>
      </Router>
    </Grid>
  );
}

const styles = {
  rowFilter: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
};
