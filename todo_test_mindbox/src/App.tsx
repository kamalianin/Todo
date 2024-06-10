import styled from "styled-components";
import TodoPage from "./assets/pages/TodoPage/index";
import {
    ChakraBaseProvider
} from '@chakra-ui/react'

import theme from './assets/theme'

function App() {

    const Screen = styled.div`
      width: 100%;
      min-height: 100vh;
      background-color: #CCCCCC;
    `

    return (
        <ChakraBaseProvider theme={theme}>
            <Screen>
                <TodoPage/>
            </Screen>
        </ChakraBaseProvider>
    )
}

export default App
