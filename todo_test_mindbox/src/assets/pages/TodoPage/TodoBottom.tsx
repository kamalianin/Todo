import React from 'react';
import { useStore, Todo as TodoType } from "../../store";
import { Box, Button, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TodoList from './TodoList';

const TodoBottom: React.FC = () => {
    const { todoList, clearCompletedTodos } = useStore();

    const [undoneLength, setUndoneLength] = useState(0);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        let length = 0;
        todoList.forEach(item => !item.checked && length++);
        setUndoneLength(length);
    }, [todoList]);

    const handleTabChange = (index: number) => {
        setTabIndex(index);
        setTabActive(index);
    };

    const [tabActive, setTabActive] = useState(0);

    const [filteredTodos, setFilteredTodos] = useState<TodoType[]>(todoList);
    useEffect(() => {
        switch(tabActive) {
            case(1):
                return setFilteredTodos(todoList.filter(item => !item.checked))
            case(2):
                return setFilteredTodos(todoList.filter(item => item.checked))
            default:
                setFilteredTodos(todoList);
        }
    }, [todoList, tabActive])


    return (
        <>
            <TodoList todoList={filteredTodos} tabIndex={tabIndex} />
            <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <Box>{undoneLength} items left</Box>
                <Tabs onChange={handleTabChange} index={tabIndex}>
                    <TabList gap="5px">
                        <Tab>All</Tab>
                        <Tab>Active</Tab>
                        <Tab>Completed</Tab>
                    </TabList>
                </Tabs>
                <Button variant="sm" onClick={() => clearCompletedTodos()}>Clear completed</Button>
            </Box>
        </>
    );
};

export default TodoBottom;