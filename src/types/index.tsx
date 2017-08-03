import { ItemType } from '../components/list';

export { ItemType } from '../components/list';

export interface StoreState {
    todos: Array<ItemType>;
    editIndex: number;
}
