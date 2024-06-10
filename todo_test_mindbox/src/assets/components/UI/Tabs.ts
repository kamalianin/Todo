
import { tabsAnatomy } from '@chakra-ui/anatomy';
import {createMultiStyleConfigHelpers} from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
    tab: {
        border: '1px solid transparent',
        fontWeight: 'semibold',
        padding: '2px 7px',
        borderRadius: '6px',
        transition: 'border .3s ease-in-out',
        _selected: {
            borderColor: 'teal'
        },
        _hover: {
          border: '1px solid #888888'
        }
    },
    tabpanel: {
        fontFamily: 'mono',
    },
});

const defaultProps = {
    size: 'xl',
    variant: 'unstyled',
    colorScheme: 'green',
};

export const tabsTheme = defineMultiStyleConfig({
    baseStyle,
    defaultProps,
});

export default tabsTheme