import React from 'react';
import {Box, Stack} from "@chakra-ui/react";
import TodoElement from "./TodoElement";
import {Todo} from "../../store";

interface TodoListProps {
    todoList: Todo[]
}

const TodoList: React.FC<TodoListProps> = ({todoList}) => {
    return (
        <Stack gap="0" data-testid="data-todo-list">
            {todoList.map(todo => <Box key={'todoListElement#' + todo.id}><TodoElement todo={todo}/></Box>)}
        </Stack>

    );
};

export default TodoList;
