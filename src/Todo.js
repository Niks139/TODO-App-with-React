import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  makeStyles,
  Input,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead,
} from "@material-ui/core";
import db from "./firebase";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";
import EditIcon from "@material-ui/icons/Edit";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
  },
  twidth: {
    maxWidth: "50%",
    align: "center",
    alignItems: "center",
    borderBlock: 1,
    justifyContent: "center",
  },
  tCell: {
    width: "50%",
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  //Updating the TODO
  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Update your To-Do</h1>
          <Input
            value={input}
            placeholder={props.todo.todo}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={updateTodo} color="primary" disabled={!input}>
            Update TODO
          </Button>
        </div>
      </Modal>
      <Table className={classes.twidth}>
        <TableRow>
          <TableCell className={classes.tCell} align="center">
            <ListItemText
              primary={props.todo.todo}
              secondary="Deadline ⏲"
            ></ListItemText>
          </TableCell>
          <TableCell className={classes.tCell} align="center">
            <EditIcon onClick={(e) => setOpen(true)} color="action"></EditIcon>
            <DeleteForeverSharpIcon
              color="secondary"
              onClick={(event) =>
                db.collection("todos").doc(props.todo.id).delete()
              }
            >
              Delete Me
            </DeleteForeverSharpIcon>
          </TableCell>
        </TableRow>
      </Table>
    </>
  );
}

export default Todo;
