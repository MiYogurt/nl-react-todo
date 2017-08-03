import { IsInAction } from '../actions';
import { StoreState } from '../types';
import { ADD_TODO, DELETE_TODO, EDIT_TODO, SET_EDIT_INDEX } from '../constants';

const startState = {
    todos: [
        { index: 1, text: 'test' }
    ],
    editIndex: 0,
};

export function Todos(state: StoreState = startState, action: IsInAction): StoreState {
    let todos: typeof state.todos = JSON.parse(JSON.stringify(state.todos));
    switch (action.type) {
        case ADD_TODO:
            return {
                editIndex: state.editIndex,
                todos: [...todos, action.todo]
            };
        case DELETE_TODO:
            const delIndex = todos.findIndex(todo => todo.index === action.index);
            todos.splice(delIndex, 1);
            return {
                editIndex: state.editIndex,
                todos,
            };
        case EDIT_TODO:
            const editTodo = todos.find(todo => todo.index === action.todo.index);
            if (!editTodo) { return state; }
            editTodo.text = action.todo.text;
            return {
                editIndex: 0,
                todos,
            };
         case SET_EDIT_INDEX:
             return {
                 editIndex: action.index,
                 todos: state.todos
             };
        default:
            return state;
    }
}