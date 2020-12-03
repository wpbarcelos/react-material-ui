import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default function Sidebar() {
  const history = useHistory();
  const [menu, setMenu] = useState("/");

  function handleMenu(param) {
    history.push(param);
    setMenu(param);
  }
  return (
    <>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button selected={"/" == menu} onClick={() => handleMenu("/")}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          selected={"/about" == menu}
          onClick={() => handleMenu("/datagrid")}
        >
          <ListItemText primary="Datagrid" />
        </ListItem>
        <ListItem
          button
          selected={"/about" == menu}
          onClick={() => handleMenu("/about")}
        >
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </>
  );
}
