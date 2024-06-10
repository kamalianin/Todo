import { inputAnatomy } from '@chakra-ui/anatomy';
import {createMultiStyleConfigHelpers} from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
    field: {
        border: 'transparent'
    }
});

const defaultProps = {
    size: 'xl',
    variant: 'unstyled',
};

export const inputTheme = defineMultiStyleConfig({
    baseStyle,
    defaultProps,
});

export default inputTheme