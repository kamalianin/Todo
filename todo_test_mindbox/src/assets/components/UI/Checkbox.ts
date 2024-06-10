import { checkboxAnatomy } from '@chakra-ui/anatomy';
import {createMultiStyleConfigHelpers, defineStyle} from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({

    control: {
        width: '30px',
        height: '30px',
        background: 'transparent',
        transition: 'all .3s ease-in-out',
        _checked: {
            background: 'transparent',
            border: '1px solid teal',
            _hover: {
                background: 'transparent'
            },
        }
    },
    icon: {
        background: 'transparent',
        color: 'teal',
        height: '15px',
    },
    label: {
        fontSize: '20px',
        _checked: {
            textDecoration: 'line-through',
            color: '#CCCCCC'
        }
    }
});

const circular = definePartsStyle({
    control: defineStyle({
        rounded: "full"
    })
})

export const checkboxTheme = defineMultiStyleConfig({
    variants: { circular },
    baseStyle
})

export default checkboxTheme