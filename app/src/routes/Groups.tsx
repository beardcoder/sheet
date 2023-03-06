import { Card, CardBody, CardHeader } from '@chakra-ui/card'

import {
  Box,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
} from '@chakra-ui/layout'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Link,
  useToast,
  Fade,
} from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useGroupsStore } from '../stores/groups'
import { FiUser } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

export type NewGroupInputs = {
  name: string
}

function Groups() {
  const { fetch, groups, add } = useGroupsStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<NewGroupInputs>()

  const onSubmit: SubmitHandler<NewGroupInputs> = async (data) => {
    try {
      await add(data)
      toast({
        title: 'Erfolg',
        description: `Die neue Gruppe ${data.name} wurde angelegt`,
      })
      onClose()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Fehler',
          description: error.response?.data.message,
          status: 'error',
        })
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <Box padding="8">
      <Fade in={!!groups}>
        <HStack spacing={4} marginBottom="8">
          <Heading size="lg">Gruppen</Heading>
        </HStack>
        <SimpleGrid columns={3} spacing={10}>
          {groups &&
            groups.map((group) => (
              <LinkBox as={Card} key={group.id}>
                <CardHeader>
                  <Heading size="md">
                    <LinkOverlay as={RouterLink} to={`/groups/${group.id}`}>
                      {group.name}
                    </LinkOverlay>
                  </Heading>
                </CardHeader>
                <CardBody>
                  <List spacing={3}>
                    {group.members?.map((member) => (
                      <ListItem key={member.userId}>
                        <ListIcon as={FiUser} color="green.500" />
                        {member.user.email}
                      </ListItem>
                    ))}
                  </List>
                </CardBody>
              </LinkBox>
            ))}
          <Card>
            <Button height="full" minHeight="60px" onClick={onOpen}>
              Neue Gruppe erstellen
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Neue Gruppe erstellen</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody>
                    <FormControl
                      isRequired
                      width={'full'}
                      isInvalid={!!errors.name}
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Helden der Stadt"
                        {...register('name', {
                          required: 'This is required',
                        })}
                      />
                      <FormErrorMessage>
                        {errors.name && errors.name.message}
                      </FormErrorMessage>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="green"
                      type="submit"
                      isDisabled={!isValid}
                      isLoading={isSubmitting}
                      mr={3}
                    >
                      Erstellen
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Abbrechen
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          </Card>
        </SimpleGrid>
      </Fade>
    </Box>
  )
}

export default Groups
