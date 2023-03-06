import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import { FunctionComponent, PropsWithChildren, useEffect } from 'react'
import { Navigate } from 'react-router'
import { Sidebar } from '../components/Sidebar'
import { useUserStore } from '../stores/user'

const Private: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { accessToken, getUser } = useUserStore()
  if (!accessToken) {
    // user is not authenticated
    return <Navigate to="/login" />
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Flex height="full">
      <Box height="full" width={'240px'}>
        <Sidebar />
      </Box>
      <Box height="full" width="full">
        {children}
      </Box>
    </Flex>
  )
}

export default Private
