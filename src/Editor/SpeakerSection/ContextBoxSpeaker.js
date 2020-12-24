import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListDividers(props) {
  const classes = useStyles();
  return (
    // <List component="nav"  className={classes.root} aria-label="mailbox folders">
    // {props.options.map((el, i)=>{
    //     <>
    //     <p>Yo dude</p>
    //     <ListItem button>
    //     <ListItemText primary="el" />
    //   </ListItem>
    //   <Divider />
    //   </>
    // })}
    // </List>

    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="Inbox" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Drafts" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  );
}

// className={"speakerClickContextBox"}
