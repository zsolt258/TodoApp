import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContext";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import DeleteDialog from "./DeleteDialog";

function TodoTable(){

    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editTodo, setEditTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDelete, setTodoToBeDelete] = useState('');

    return (
        <Fragment>
            <form onSubmit={(event) => context.createTodo(event,{name: addTodo})}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell align={"right"}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <TextField value={addTodo} onChange={event => setAddTodo(event.target.value)} label={'New Task'} fullWidth={true}/>
                        </TableCell>
                        <TableCell align={"right"}>
                            <IconButton type={"submit"}>
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.map((todo,index) => (
                        <TableRow key={'todo' + index}>
                            <TableCell>
                                { editIsShown === todo.id ?
                                    <TextField
                                        value={editTodo}
                                        onChange={(event) => setEditTodo(event.target.value)}
                                        InputProps={{
                                            endAdornment:
                                                <Fragment>
                                                    <IconButton><CloseIcon onClick={() => setEditIsShown(false)} /></IconButton>
                                                    <IconButton>
                                                        <DoneIcon onClick={() => {
                                                            context.updateTodo({id: todo.id, name: editTodo});
                                                            setEditIsShown(false);
                                                        }}/>
                                                    </IconButton>
                                                </Fragment>
                                        }}
                                    />
                                    : todo.name
                                }

                            </TableCell>
                            <TableCell align={"right"}>
                                <IconButton><EditIcon onClick={() => {setEditIsShown(todo.id); setEditTodo(todo.name)}}/></IconButton>
                                <IconButton><DeleteIcon onClick={() => {setDeleteConfirmationIsShown(true); setTodoToBeDelete(todo)}}/></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </form>


            {deleteConfirmationIsShown && (
                <DeleteDialog
                    open={deleteConfirmationIsShown}
                    setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                    todo={todoToBeDelete}/>
            )}


        </Fragment>
    );
}

export default TodoTable;