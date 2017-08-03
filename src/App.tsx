import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');
import Input from './components/input';
import List, { ItemType } from './components/list';

import * as actions from './actions/';
import { StoreState } from './types';
import { connect, Dispatch } from 'react-redux';

interface Props {
  todos: Array<ItemType>;
  index: number;
  onAddTodo: (todo: ItemType) => void;
  onDeleteTodo: (index: number) => void;
  onEditTodo: (todo: ItemType) => void;
  onEditIndex: (index: number) => void;
}

export function mapStateToProps({ todos, editIndex }: StoreState) {
  return {
    todos,
    index: editIndex,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.IsInAction>) {
  return {
    onAddTodo: (todo: ItemType) => dispatch(actions.AddTodo(todo)),
    onDeleteTodo: (index: number) => dispatch(actions.DeleteTodo(index)),
    onEditTodo: (todo: ItemType) => dispatch(actions.EditTodo(todo)),
    onEditIndex: (index: number) => dispatch(actions.EditIndex(index)),
  };
}

function App(props: Props) {
  let InputText: HTMLInputElement;

  function handleAdd() {
    const value = InputText.value;

    if (props.index) {
      props.onEditTodo({
        index: props.index,
        text: value,
      });
      InputText.value = '';
      return;
    }

    props.onAddTodo({
      index: Math.round(Math.random() * 1000),
      text: value,
    });

    InputText.value = '';
  }

  function handleDel(index: number) {
    props.onDeleteTodo(index);
    InputText.value = '';
    return;
  }

  function handleEdit(todo: ItemType) {
    InputText.value = todo.text;
    props.onEditIndex(todo.index);
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <div className="container">
        <Input inputRef={input => InputText = input} submit={() => handleAdd()} />
        <List
          del={(index: number) => handleDel(index)}
          edit={(todo: ItemType) => handleEdit(todo)}
          todos={props.todos}
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
