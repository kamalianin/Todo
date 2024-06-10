import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoBottom from '../../pages/TodoPage/TodoBottom';
import {useStore} from '../../store';
import TodoList from '../../pages/TodoPage/TodoList';

jest.mock('../../store', () => ({
    useStore: jest.fn(),
}));

jest.mock('../../pages/TodoPage/TodoList', () => ({
    __esModule: true,
    default: ({todoList, tabIndex}: { todoList: any[]; tabIndex: number }) => {
        const filteredTodos = todoList.filter((todo) => {
            if (tabIndex === 1) {
                return !todo.checked;
            } else if (tabIndex === 2) {
                return todo.checked;
            }
            return true;
        });
        return (
            <div data-testid="mocked-todo-list">
                {filteredTodos.map((todo) => (
                    <div key={todo.id} data-testid={`todo-item-${todo.id}`}>
                        {todo.text}
                    </div>
                ))}
            </div>
        );
    },
}));

describe('TodoBottom component', () => {
    beforeEach(() => {
        (useStore as jest.Mock).mockReset();
    });
    test('Renders the undone todos count', () => {
        const todoList = [
            {id: 1, name: 'Todo 1', checked: false},
            {id: 2, name: 'Todo 2', checked: true},
            {id: 3, name: 'Todo 3', checked: false},
        ];
        (useStore as jest.Mock).mockReturnValue({
            todoList,
            clearCompletedTodos: jest.fn(),
        });
        render(
            <>
                <TodoList todoList={todoList}/>
                <TodoBottom setTabActive={jest.fn()}/>
            </>
        );
        expect(screen.getByText('2 items left')).toBeInTheDocument();
    });


    test('Filters the todo list based on the selected tab', () => {
        const todoList = [
            {id: 1, name: 'Todo 1', checked: false},
            {id: 2, name: 'Todo 2', checked: true},
            {id: 3, name: 'Todo 3', checked: false},
        ];

        (useStore as jest.Mock).mockReturnValue({
            todoList,
            clearCompletedTodos: jest.fn(),
        });
        render(<TodoBottom/>);

        expect(screen.getByTestId('mocked-todo-list')).toBeInTheDocument();
        expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
        expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
        expect(screen.getByTestId('todo-item-3')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Active'));
        expect(screen.getByTestId('mocked-todo-list')).toBeInTheDocument();
        expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
        expect(screen.queryByTestId('todo-item-2')).not.toBeInTheDocument();
        expect(screen.getByTestId('todo-item-3')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Completed'));

        expect(screen.getByTestId('mocked-todo-list')).toBeInTheDocument();
        expect(screen.queryByTestId('todo-item-1')).not.toBeInTheDocument();
        expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
        expect(screen.queryByTestId('todo-item-3')).not.toBeInTheDocument();
    });

    test('Clears completed todos when the "Clear completed" button is clicked', () => {
        const todoList = [
            {id: 1, text: 'Todo 1', checked: false},
            {id: 2, text: 'Todo 2', checked: true},
            {id: 3, text: 'Todo 3', checked: false},
        ];
        const clearCompletedTodosMock = jest.fn();
        (useStore as jest.Mock).mockReturnValue({
            todoList,
            clearCompletedTodos: clearCompletedTodosMock,
        });
        render(<TodoBottom/>);

        expect(screen.getByTestId('mocked-todo-list')).toBeInTheDocument();
        expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
        expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
        expect(screen.getByTestId('todo-item-3')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Clear completed'));
        expect(clearCompletedTodosMock).toHaveBeenCalled();
    });
});