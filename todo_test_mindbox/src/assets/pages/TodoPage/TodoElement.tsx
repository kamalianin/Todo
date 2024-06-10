import React from 'react';
import { Checkbox } from "@chakra-ui/react";
import styled from "styled-components";
import { Todo, useStore } from "../../store";

interface TodoElementProps {
    todo: Todo;
}

const TodoElementComponent = styled.div`
  border-bottom: 1px solid #CCCCCC;
  transition: all .3s ease-in-out;

  &:hover {
    background: #F8F8F8;
    color: teal;
  }
`;

const TodoElement: React.FC<TodoElementProps> = ({ todo }) => {
    const { checkTodo } = useStore();
    return (
        <TodoElementComponent data-testid={`todo-item-${todo.id}`}>
            <Checkbox
                variant='circular'
                onChange={() => checkTodo(todo.id)}
                sx={{ width: '100%', padding: '10px' }}
                isChecked={todo.checked}
            >
                {todo.name}
            </Checkbox>
        </TodoElementComponent>
    );
};

export default TodoElement;