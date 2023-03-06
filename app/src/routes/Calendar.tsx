import { Card, CardBody, CardHeader } from '@chakra-ui/card'

import { Box, Flex, Heading, HStack } from '@chakra-ui/layout'

function Calendar() {
  return (
    <Box padding="8">
      <HStack spacing={4} marginBottom="8">
        <Heading size="lg">Kalender</Heading>
      </HStack>
    </Box>
  )
}

export default Calendar
