import {create} from 'zustand'

export type Todo = {
    name: string,
    checked: boolean,
    id: number
}

interface TodoState {
    todoList: Todo[],
    addTodo: (name: string) => void,
    checkTodo: (todoIndex: number) => void
    clearCompletedTodos: () => void
}

export const useStore = create<TodoState>((set) => ({
    todoList: [],
    addTodo: (name) => set((state) => ({
        todoList: [...state.todoList, {
            name: name,
            checked: false,
            id: Number(new Date())
        }]
    })),
    checkTodo: (id) => {
        set((state) => (
            {
                todoList: state.todoList.map(todo => todo.id === id ? {
                    ...todo,
                    checked: !todo.checked
                } : todo)
            }
        ))
    },
    clearCompletedTodos: () => set((state) => ({todoList: state.todoList.filter(todo => !todo.checked)})),
}))