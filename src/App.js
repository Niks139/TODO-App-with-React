import React, { useState, useEffect } from "react";
import {
  Button,
  InputLabel,
  FormControl,
  Input,
  Table,
  TableRow,
  TableHead,
  TableCell,
  makeStyles,
  TableBody,
} from "@material-ui/core";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 500,
    alignItems: "center",
    border: 1,
  },
}));

function App() {
  const [todos, setTodos] = useState([]); //Initial todo will be empty
  const [input, setInput] = useState("");
  const classes = useStyles();

  useEffect(() => {
    //Code here runs when the app.js loads

    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //setTodos(snapshot.docs.map(document => ({id: document.id ,todo: document.data().todo}) ));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //this will add when button is clicked

    event.preventDefault(); //Form submit will not referesh the page.

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTodos([...todos, input]);
    setInput(""); // THis will clear the input field.
  };

  return (
    <div className="App">
    
      <h1>Welcome to the todo list website</h1>
      

      <form>
        <FormControl>
          <InputLabel>Write a todo here</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
          disabled={!input}
        >
          Add
        </Button>
      </form>
      <h2>Todo List</h2>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>TODO</TableCell>
            <TableCell align="left">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <ul>
                {todos.map((todo) => (
                  <Todo todo={todo} />
                ))}
              </ul>
            </TableCell>
            <TableCell>

            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
