import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');
import Input from './components/input';
import List, { ItemType } from './components/list';

interface States {
  todos: Array<ItemType>;
  editIndex: number | boolean;
}

class App extends React.Component<{}, States> {
  InputText: HTMLInputElement;
  constructor(props: {}) {
    super(props);
    this.state = {
      todos: [{ index: 1, text: 'test' }],
      editIndex: false,
    };
  }

  handleAdd() {
    const value = this.InputText.value;

    if (this.state.editIndex) {
      const editTodo = this.state.todos.find(todo => todo.index === this.state.editIndex);
      if (!editTodo) { return; }
      editTodo.text = value;
      this.setState({
        todos: this.state.todos
      });
      this.InputText.value = '';
      return;
    }

    const index = this.state.todos.length + 40;

    this.setState({
      todos: [...this.state.todos, { text: value, index }]
    });

    this.InputText.value = '';
  }

  handleDel(index: number) {
    const delIndex = this.state.todos.findIndex(todo => todo.index === index);
    const todos = this.state.todos;
    todos.splice(delIndex, 1);
    if (this.state.editIndex !== index) {
      this.setState({
        todos,
      });
      return ;
    }
    this.setState({
      todos,
      editIndex: false
    });
    this.InputText.value = '';
    return ;
  }

  handleEdit(todo: ItemType) {
    this.InputText.value = todo.text;
    this.setState({
      editIndex: todo.index
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="container">
          <Input inputRef={input => this.InputText = input} submit={() => this.handleAdd()} />
          <List
            del={(index: number) => this.handleDel(index)}
            edit={(todo: ItemType) => this.handleEdit(todo)}
            todos={this.state.todos}
          />
        </div>
      </div>
    );
  }
}

export default App;
