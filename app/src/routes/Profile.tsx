import { Box, Heading, HStack } from '@chakra-ui/layout'
import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Icon,
  InputGroup,
  InputLeftAddon,
  Textarea,
  IconButton,
  Fade,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { User, useUserStore } from '../stores/user'
import { FiArrowLeft, FiEdit, FiEdit2, FiFile, FiPenTool } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export type NewGroupInputs = {
  name: string
}

function Profile() {
  const { user } = useUserStore()
  const { register, handleSubmit, watch } = useForm<User>({
    defaultValues: user,
  })

  const onSubmit: SubmitHandler<User> = async (data) => {
    useUserStore.getState().update(data)
  }

  const avatarRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register('avatar')

  const renderPreview = (avatar: undefined | string | FileList) => {
    if (!avatar) return undefined
    if (avatar instanceof FileList) {
      return URL.createObjectURL(avatar[0])
    }
    return `http://localhost:3000/${avatar}`
  }

  const preview = renderPreview(watch('avatar'))
  var navigate = useNavigate()

  return (
    <Box padding="8">
      <Fade in={!!user}>
        <HStack spacing={4} marginBottom="8">
          <IconButton
            onClick={() => navigate(-1)}
            aria-label="Zurück zu den gruppen"
            icon={<FiArrowLeft />}
          ></IconButton>
          <Heading size="lg">Profil</Heading>
        </HStack>
        <Box maxW="600px" mx="auto" mt="8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="avatar" mb="4" display="flex">
              <Input
                type="file"
                accept="image/png, image/jpeg"
                multiple={false}
                hidden
                {...rest}
                ref={(e) => {
                  ref(e)
                  avatarRef.current = e
                }}
              />
              <Box position="relative" mx="auto">
                <Avatar size="2xl" name="Markus Sommer" src={preview} />
                <IconButton
                  onClick={() => avatarRef.current?.click()}
                  aria-label="Edit avatar"
                  colorScheme="green"
                  position="absolute"
                  size="lg"
                  bottom="-5px"
                  right="-5px"
                  rounded="full"
                  icon={<FiEdit2 />}
                />
              </Box>
            </FormControl>
            <FormControl id="name" mb="4">
              <FormLabel>Name</FormLabel>
              <Input type="text" {...register('name')} />
            </FormControl>
            <FormControl id="email" mb="4">
              <FormLabel>Email</FormLabel>
              <Input type="email" {...register('email')} />
            </FormControl>
            <Button type="submit">Save Changes</Button>
          </form>
        </Box>
      </Fade>
    </Box>
  )
}

export default Profile
