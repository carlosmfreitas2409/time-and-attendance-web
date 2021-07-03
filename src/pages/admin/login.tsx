import Head from "next/head";
import { Button, Box, Flex, Heading, Text, VStack, Icon, Img, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";
import { withSSRGuest } from "../../utils/withSSRGuest";

interface LoginFormData {
  email: string;
  password: string;
}

const createSessionForm = Yup.object().shape({
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: Yup.string().required('Senha obrigatória')
});

export default function Login() {
  const { signIn } = useAuth();
  const toast = useToast();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createSessionForm),
  });

  const { errors } = formState;

  async function handleFormLogin(data: LoginFormData) {
    try {
      await signIn(data);
    } catch(err) {
      toast({
        status: 'error',
        title: 'Ocorreu um erro durante a autenticação!',
        description: err.response.data.message,
        position: 'top-right'
      })
    }
  }

  return (
    <>
      <Head>
        <title>Login | Time &amp; Attendance</title>
      </Head>

      <Flex bg="gray.900" h="100vh" w="100vw">
        <Flex as="section" flex="1" align="center" justify="center">
          <Img src="/login-background.png" alt="Time &amp; Attendance" />
        </Flex>

        <Flex as="aside" w={520} bg="gray.50" direction="column" justify="center" p="20">
          <Link href="/" passHref>
            <Button
              as="a"
              w={14}
              h={14}
              bg="gray.100"
              borderRadius="2xl"
              position="absolute"
              top="10"
              right="10"
              transition="all .2s"
              _hover={{ filter: 'brightness(0.9)' }}
              _active={{ filter: 'brightness(0.9)' }}
            >
              <Icon as={FiArrowLeft} boxSize={6} color="gray.300" />
            </Button>
          </Link>

          <Box as="form" onSubmit={handleSubmit(handleFormLogin)}>
            <Heading
              fontSize="4xl"
              fontWeight="semibold"
              color="gray.600"
            >
              Fazer login
            </Heading>

            <Text color="gray.300" mt="4">
              Estamos quase lá! Agora só falta o login!
            </Text>

            <VStack spacing="4" mt="10">
              <Input
                placeholder="Email"
                icon={FiMail}
                error={errors.email}
                {...register('email')}
              />

              <Input
                type="password"
                placeholder="Senha"
                icon={FiLock}
                error={errors.password}
                {...register('password')}
              />
            </VStack>

            <Button type="submit" w="100%" h="auto" mt="6" isLoading={formState.isSubmitting}>
              Login
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});