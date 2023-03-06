import { Flex } from '@chakra-ui/layout'
import { FunctionComponent, PropsWithChildren } from 'react'

const Public: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Flex justify={'center'} align={'center'} height={'full'}>
      {children}
    </Flex>
  )
}

export default Public
