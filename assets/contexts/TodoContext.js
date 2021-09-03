import React, {Component, createContext} from 'react';
import axios from "axios";

export const TodoContext = createContext();

class TodoContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        }
        this.readTodo();
    }

    createTodo(event, todo){
        event.preventDefault();
        console.log(todo);
        axios.post('/api/todo/create', todo)
            .then(response => {
                let originalTodos = [...this.state.todos];
                originalTodos.push(response.data.todo);
                this.setState({todos: originalTodos});
            })
            .catch(error => { console.error(error); })
    }

    readTodo(){
        axios.get('api/todo')
            .then(response => {
                this.setState({
                    todos : response.data,
                })
            })
            .catch(error => {
                console.error(error);
            })
    }

    deleteTodo(data){

        axios.delete('api/todo/delete/'+ data.id)
            .then(response => {
                let originalTodos = [...this.state.todos];
                let todo = originalTodos.find(todo => todo.id === data.id);
                originalTodos.splice(originalTodos.indexOf(todo), 1);
                this.setState({todos: originalTodos});
            })
            .catch(error => {
                console.log(error);
            })
    }

    updateTodo(data){
        axios.put('/api/todo/update/' + data.id, data)
            .then(response => {
                let originalTodos = [...this.state.todos];
                let todo = originalTodos.find(todo => todo.id === data.id);
                todo.name = data.name;
                this.setState({todos: originalTodos});
            })
            .catch(error => {console.error(error)})
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                readTodo: this.readTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;