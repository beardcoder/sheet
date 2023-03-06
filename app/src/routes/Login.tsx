import { Button } from '@chakra-ui/button'
import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { VStack, Heading, Link } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useUserStore } from '../stores/user'

type Inputs = {
  email: string
  password: string
}

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>()

  const navigate = useNavigate()
  const toast = useToast()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await useUserStore.getState().login(data)

      if (useUserStore.getState().accessToken) navigate('/')
      toast({
        title: 'Login',
        description: 'Du bist jetzt eingeloggt',
        status: 'success',
      })
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

  return (
    <Card width={'sm'}>
      <CardHeader>
        <Heading size="md">Anmlden</Heading>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="4">
            <FormControl isRequired width={'full'} isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="gandalf@der-graue.mittelerde"
                {...register('email', {
                  required: 'This is required',
                })}
              />
              <FormHelperText>asf@asf.de</FormHelperText>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              width={'full'}
              isInvalid={!!errors.password}
            >
              <FormLabel htmlFor="password">Passwort</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="***************"
                {...register('password', {
                  required: 'This is required',
                })}
              />
              <FormHelperText>asf@asf.de</FormHelperText>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>
          <Button
            mt={'8'}
            width={'full'}
            isDisabled={!isValid}
            isLoading={isSubmitting}
            type="submit"
          >
            Absenden
          </Button>
        </form>
      </CardBody>
      <CardFooter>
        Noch keinen Akkount?&nbsp;
        <Link colorScheme="green" color="green" as={RouterLink} to="/register">
          Jetzt Registrieren
        </Link>
      </CardFooter>
    </Card>
  )
}

export default Login
