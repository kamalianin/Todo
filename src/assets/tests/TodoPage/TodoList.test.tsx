import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../../pages/TodoPage/TodoList';
import { useStore, Todo as TodoType } from '../../store';
import TodoBottom from "../../pages/TodoPage/TodoBottom";

interface MockedUseStore {
    todoList: TodoType[];
    addTodo: jest.Mock;
    checkTodo: jest.Mock;
}

jest.mock('../../store', () => ({
    useStore: jest.fn<MockedUseStore, []>(),
}));

describe('TodoList component', () => {
    test('Renders the todo list correctly', () => {
        const todoList: TodoType[] = [
            { id: 0, name: 'Todo 1', checked: false },
            { id: 1, name: 'Todo 2', checked: true },
        ];

        (useStore as unknown as jest.Mock<MockedUseStore, []>).mockReturnValue({
            todoList,
            addTodo: jest.fn(),
            checkTodo: jest.fn(),
        });

        render(<TodoList todoList={todoList} />);

        expect(screen.getByTestId('data-todo-list')).toBeInTheDocument();
        expect(screen.getByTestId('todo-item-0')).toBeInTheDocument();
        expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    });

    test('Adds a new todo to the list', () => {
        const todoList: TodoType[] = [
            { id: 0, name: 'Todo 1', checked: false },
            { id: 1, name: 'Todo 2', checked: true },
        ];

        const addTodoMock = jest.fn((todoName: string) => {
            const newTodo: TodoType = {
                id: todoList.length,
                name: todoName,
                checked: false,
            };
            todoList.push(newTodo);
            (useStore as unknown as jest.Mock<MockedUseStore, []>).mockReturnValue({
                todoList,
                addTodo: addTodoMock,
                checkTodo: jest.fn(),
            });
        });

        (useStore as unknown as jest.Mock<MockedUseStore, []>).mockReturnValue({
            todoList,
            addTodo: addTodoMock,
            checkTodo: jest.fn(),
        });

        const { rerender } = render(<TodoList todoList={todoList} />);

        expect(screen.queryByTestId('todo-item-2')).not.toBeInTheDocument();

        addTodoMock('New Todo');
        rerender(<TodoList todoList={todoList} />);
        expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    });

    test('Checks and unchecks a todo in the list', () => {
        const todoList: TodoType[] = [
            { id: 0, name: 'Todo 1', checked: false },
            { id: 1, name: 'Todo 2', checked: true },
        ];

        let updatedTodoList = [...todoList];

        const checkTodoMock = jest.fn((todoId: number) => {
            updatedTodoList = updatedTodoList.map((todo) =>
                todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
            );
            (useStore as unknown as jest.Mock<MockedUseStore, []>).mockReturnValue({
                todoList: updatedTodoList,
                addTodo: jest.fn(),
                checkTodo: checkTodoMock,
            });
        });

        (useStore as unknown as jest.Mock<MockedUseStore, []>).mockReturnValue({
            todoList,
            addTodo: jest.fn(),
            checkTodo: checkTodoMock,
        });

        const { getByTestId, rerender } = render(<TodoList todoList={todoList} />);

        const todoItem1 = getByTestId('todo-item-0');
        const todoItem2 = getByTestId('todo-item-1');

        expect(todoList[0].checked).toBe(false);
        expect(todoList[1].checked).toBe(true);

        fireEvent.click(todoItem1);
        expect(checkTodoMock).toHaveBeenCalledWith(0);
        rerender(<TodoList todoList={updatedTodoList} />);
        expect(updatedTodoList[0].checked).toBe(true);

        fireEvent.click(todoItem2);
        expect(checkTodoMock).toHaveBeenCalledWith(1);
        rerender(<TodoList todoList={updatedTodoList} />);
        expect(updatedTodoList[1].checked).toBe(false);
    });
});