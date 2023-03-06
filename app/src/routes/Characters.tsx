import { Card, CardBody, CardHeader } from '@chakra-ui/card'

import { Box, Flex, Heading, HStack } from '@chakra-ui/layout'

function Characters() {
  return (
    <Box padding="8">
      <HStack spacing={4} marginBottom="8">
        <Heading size="lg">Figuren</Heading>
      </HStack>
    </Box>
  )
}

export default Characters
