import React from 'react'
import {Box, IconButton, Input} from "@chakra-ui/react";
import {ChevronDownIcon} from '@chakra-ui/icons'
import {useState} from "react";
import {useStore} from '../../store';
import TodoBottom from "./TodoBottom";


const Todo: React.FC = () => {

    const [inputText, setInputText] = useState('');

    const {addTodo} = useStore();

    const addTodoHandler = () => {
        addTodo(inputText);
        setInputText('');
    }

    return (
        <Box sx={{
            background: "#FFFFFF",
            width: '100%',
            borderRadius: '2px',
            boxShadow: 'rgba(100, 100, 111, 0.5) 0px 7px 29px 0px',
        }}>
            <Box sx={{
                padding: '10px',
                borderBottom: '2px solid #CCCCCC',
                display: 'flex',
                alignItems: 'center',
            }}>
                <IconButton data-testid="addTodoBtn" aria-label="Add todo" sx={{background: 'transparent', width: '30px', height: '30px', minWidth: '30px'}} isDisabled={!inputText} onClick={() => addTodoHandler()}>
                    <ChevronDownIcon w={6} h={6}/>
                </IconButton>
                <Input data-testid="todoInput" onChange={(e) => {
                    setInputText(e.target.value)
                }} value={inputText} height="30px" fontStyle="italic" padding="5px" width="100%"
                       placeholder="What needs to be done?"/>
            </Box>
            <TodoBottom />
        </Box>
    );
};

export default Todo;
