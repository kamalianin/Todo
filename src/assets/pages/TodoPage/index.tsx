import {Page} from '../../components/shared-components'
import {Box, Heading} from "@chakra-ui/react";
import Todo from "./Todo";

const Index = () => {
    return (
        <Page>
            <Box sx={{maxWidth: '750px'}}>
                <Heading sx={{textAlign: 'center', fontSize: '60px', fontWeight: '300', marginBottom: '15px'}}>todos</Heading>
                <Todo/>
            </Box>
        </Page>
    );
};

export default Index;
