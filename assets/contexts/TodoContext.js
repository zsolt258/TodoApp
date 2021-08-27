import React, {Component, createContext} from 'react';


export const TodoContext = createContext();

class TodoContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {id:1, name: 'Todo something 1'},
                {id:2, name: 'Todo something 2'},
                {id:3, name: 'Todo something 3'},
                {id:4, name: 'Todo something 4'},
            ],
        }
    }

    createTodo(event, todo){
        event.preventDefault();
        let originalTodos = [...this.state.todos];
        originalTodos.push(todo);
        this.setState({
            todos: originalTodos,
        });
    }

    readTodo(){

    }

    deleteTodo(data){
        let originalTodos = [...this.state.todos];
        let todo = originalTodos.find(todo => todo.id === data.id);

        originalTodos.splice(originalTodos.indexOf(todo), 1);

        this.setState({todos: originalTodos});
    }

    updateTodo(data){
        let originalTodos = [...this.state.todos];
        let todo = originalTodos.find(todo => todo.id === data.id);
        todo.name = data.name;
        this.setState({todos: originalTodos});
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