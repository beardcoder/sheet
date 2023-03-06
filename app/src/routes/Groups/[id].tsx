import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Fade,
  Flex,
  Heading,
  HStack,
  IconButton,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FiArrowLeft, FiPlus, FiSettings } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { Group, useGroupsStore } from '../../stores/groups'

const GroupsId = () => {
  const { id } = useParams<any>()
  const { fetchById } = useGroupsStore()
  const [group, setGroup] = useState<Group | null>(null)

  useEffect(() => {
    fetchById(Number(id)).then((data) => {
      setGroup(data)
    })
  }, [id])
  return (
    <Box padding="8">
      <Fade in={!!group}>
        <Flex marginBottom="8" width="full">
          <IconButton
            as={Link}
            to="/groups"
            aria-label="Zurück zu den gruppen"
            marginRight={4}
            icon={<FiArrowLeft />}
          ></IconButton>
          <Heading size="lg">{group?.name}</Heading>
          <IconButton
            marginLeft="auto"
            aria-label="Zurück zu den gruppen"
            icon={<FiSettings />}
          ></IconButton>
        </Flex>
        <HStack width="full">
          <Card maxW="420px" width="full">
            <CardHeader>
              <Flex alignItems="center">
                <Heading size="md">Mitglieder</Heading>
                <IconButton
                  marginLeft="auto"
                  size="sm"
                  variant="outline"
                  colorScheme="green"
                  aria-label="Mitglied Hinzufügen"
                  icon={<FiPlus />}
                ></IconButton>
              </Flex>
            </CardHeader>
            <CardBody>
              <VStack spacing={3} justify="start" alignItems="start">
                {group?.members?.map((member) => (
                  <HStack>
                    <Avatar
                      size="sm"
                      src={
                        member.user?.avatar
                          ? `http://localhost:3000/${member.user?.avatar}`
                          : undefined
                      }
                    />
                    <Box>
                      {member.user.name ? member.user.name : member.user.email}
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </HStack>
      </Fade>
    </Box>
  )
}

export default GroupsId
