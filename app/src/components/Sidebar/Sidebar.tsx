import {
  Avatar,
  Icon,
  Button,
  Divider,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
  useColorModeValue,
  Box,
} from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { NavLink as RouterLink, useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/user'
import {
  FiLogOut,
  FiHome,
  FiCalendar,
  FiUsers,
  FiPenTool,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'

export type MenuItem = {
  to: string
  label: string
  icon: IconType
}

const menu: MenuItem[] = [
  {
    label: 'Home',
    to: '/',
    icon: FiHome,
  },
  {
    label: 'Kalender',
    to: '/calendar',
    icon: FiCalendar,
  },
  {
    label: 'Gruppen',
    to: '/groups',
    icon: FiUsers,
  },
  {
    label: 'Figuren',
    to: '/characters',
    icon: FiPenTool,
  },
]

export type Props = {}

const Sidebar: FunctionComponent<Props> = () => {
  const { logout, user } = useUserStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <VStack
      height="full"
      width="full"
      backgroundColor={useColorModeValue('gray.100', 'blackAlpha.300')}
    >
      <RouterLink to="/profile">
        <Flex direction="column" alignItems="center" width="full" paddingY="6">
          <Avatar
            size="xl"
            src={
              user?.avatar ? `http://localhost:3000/${user?.avatar}` : undefined
            }
          />
          <Text fontWeight="bold">{user?.name ?? user?.email}</Text>
        </Flex>
      </RouterLink>
      <Flex
        paddingTop="4"
        direction="column"
        width="full"
        height="full"
        overflowY="auto"
        backgroundColor={useColorModeValue('gray.200', 'blackAlpha.500')}
      >
        {menu.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            as={RouterLink}
            end
            textColor="gray.500"
            _hover={{ textColor: useColorModeValue('black', 'white') }}
            _activeLink={{
              textColor: useColorModeValue('green', 'green.300'),
              '& > .menu-icon': {
                textColor: 'white',
                backgroundColor: 'green',
              },
            }}
            width="full"
            paddingX="4"
            paddingY="3"
            display="flex"
            alignItems="center"
            role="group"
            to={to}
          >
            <Box
              borderWidth="1px"
              className="menu-icon"
              marginRight="2"
              padding="2"
              borderRadius="full"
            >
              <Icon />
            </Box>
            <span>{label}</span>
          </Link>
        ))}
        <Button
          onClick={handleLogout}
          colorScheme="green"
          flex="none"
          borderRadius="0"
          marginTop="auto"
        >
          <FiLogOut className="mr-2" />
          Logout
        </Button>
      </Flex>
    </VStack>
  )
}

export default Sidebar
