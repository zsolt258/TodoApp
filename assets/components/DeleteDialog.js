import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {TodoContext} from "../contexts/TodoContext";

function DeleteDialog(props) {

    const context = useContext(TodoContext);
    const hide = () => {props.setDeleteConfirmationIsShown(false)};

    return (
        <Dialog onClose={hide} fullWidth={true} maxWidth={'sm'} open={props.open}>
            <DialogTitle>Are you sure you wish to delete this to-do?</DialogTitle>
            <DialogContent>
                {props.todo.name}
            </DialogContent>
            <DialogActions>
                <Button onClick={hide}>Cancel</Button>
                <Button onClick={ () =>
                    {
                        context.deleteTodo({id: props.todo.id, name: props.todo.name})
                        hide();
                    }}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    open : PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
    todo: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }
    ).isRequired
};

export default DeleteDialog;