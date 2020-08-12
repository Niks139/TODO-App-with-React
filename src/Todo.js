import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, Modal, makeStyles, Input} from '@material-ui/core';
import db from './firebase';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import EditIcon from '@material-ui/icons/Edit';
import "./App.css";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,4),
    },
    posiEdit : {
        position: "absolute",
        marginLeft: 310,
    },
    posiDel : {
        position: "absolute",
        marginLeft: 340,
    },
    
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    

    //Updating the TODO
    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        },{merge: true})
        setOpen(false);
    }

    return (
        <>
        <Modal 
            open={open}
            onClose={e => setOpen(false)}
        > 
        <div className={classes.paper}>
            <h1>Update your To-Do</h1>
            <Input value={input} placeholder={props.todo.todo} onChange={event => setInput(event.target.value)} />
            <Button onClick={updateTodo} color="primary" disabled={!input}> Update TODO</Button>
        </div>

        </Modal>
        <div>
            <List>
                <ListItem>
                    <ListItemText primary={props.todo.todo} secondary='Deadline ⏲' className={classes.posiItem}></ListItemText>
                    <EditIcon onClick={e => setOpen(true)} color="action" className={classes.posiEdit}></EditIcon> &nbsp;&nbsp;&nbsp;
                    <DeleteForeverSharpIcon color="secondary" onClick={event => db.collection('todos').doc(props.todo.id).delete()} className={classes.posiDel}> Delete Me</DeleteForeverSharpIcon>
                </ListItem>    
            </List>
        </div>
        </>
    )
}

export default Todo;