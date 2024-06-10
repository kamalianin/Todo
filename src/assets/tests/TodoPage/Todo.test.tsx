import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../../pages/TodoPage/Todo';
import { useStore } from '../../store';

jest.mock('../../store', () => ({
    useStore: jest.fn(),
}));

describe('Todo component', () => {
    beforeEach(() => {
        (useStore as jest.Mock).mockReset();
    });
    test('Renders the Todo component', () => {
        (useStore as jest.Mock).mockReturnValue({
            todoList: [],
            addTodo: jest.fn(),
        });
        render(<Todo />);
        expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
        expect(screen.getByTestId('addTodoBtn')).toBeInTheDocument();
    });
    test('Disables the add todo button when input is empty', () => {
        (useStore as jest.Mock).mockReturnValue({
            todoList: [],
            addTodo: jest.fn(),
        });
        render(<Todo />);
        const addTodoBtn = screen.getByTestId('addTodoBtn');
        expect(addTodoBtn).toBeDisabled();
    });
    test('Enables the add todo button when input has text', () => {
        (useStore as jest.Mock).mockReturnValue({
            todoList: [],
            addTodo: jest.fn(),
        });
        render(<Todo />);
        const todoInput = screen.getByTestId('todoInput');
        const addTodoBtn = screen.getByTestId('addTodoBtn');
        fireEvent.change(todoInput, { target: { value: 'New todo' } });
        expect(addTodoBtn).toBeEnabled();
    });
    test('Clears the input when add todo button is clicked', () => {
        const addTodoMock = jest.fn();
        (useStore as jest.Mock).mockReturnValue({
            todoList: [],
            addTodo: addTodoMock,
        });
        render(<Todo />);
        const todoInput = screen.getByTestId('todoInput');
        const addTodoBtn = screen.getByTestId('addTodoBtn');
        fireEvent.change(todoInput, { target: { value: 'New todo' } });
        fireEvent.click(addTodoBtn);
        expect(addTodoMock).toHaveBeenCalledWith('New todo');
        expect(todoInput).toHaveValue('');
    });
});