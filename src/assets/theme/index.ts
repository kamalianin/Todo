import { extendTheme } from '@chakra-ui/react'
import Button from '../components/UI/Button.ts'
import Tabs from "../components/UI/Tabs";
import Input from "../components/UI/Input";
import Checkbox from "../components/UI/Checkbox";

export const theme = extendTheme({
    components: {
        Button,
        Tabs,
        Input,
        Checkbox
    }
})

export default theme