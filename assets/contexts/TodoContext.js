import React, {Component, createContext} from 'react';


export const TodoContext = createContext();

class TodoContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {name:'do something 1'},
                {name:'do something 2'},
                {name:'do something 3'},
                {name:'do something 4'},
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

    updateTodo(){

    }

    deleteTodo(){

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