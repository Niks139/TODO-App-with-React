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
  Typography,
  createMuiTheme,
  ThemeProvider,

} from "@material-ui/core";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 475,
    alignItems: "center",
    borderBlock: 1,
  },
}));

const theme = createMuiTheme({
  typography: {
    h3: {
      fontSize: 54,
      fontFamily: "Alex Brush"
    },
    h4: {
      fontFamily: "Caveat, cursive"
    },
    button: {
      fontStyle: "italic"
    }
  }
});


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
      <ThemeProvider theme={theme}>
        <Typography variant="h3">Welcome to the To-Do list website</Typography>
      <form>
        <FormControl>
          <InputLabel>Write a To-Do here</InputLabel>
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
        </Button><br></br> <br></br>
      </form>
      <Typography variant="h4"><span role="img" aria-label="Check"> ✅</span> To-Do List</Typography>
      <Table className={classes.table} align="center">
        <TableHead>
          <TableRow>
            <TableCell align="left">TODO</TableCell>
            <TableCell align="left">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">
              
                {todos.map((todo) => (
                  <Todo todo={todo} />
                ))}
              
            </TableCell>
            <TableCell>

            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </ThemeProvider>
    </div>
  );
}

export default App;
