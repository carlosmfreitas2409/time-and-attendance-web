import { Container, Box, Button, Flex, Heading, Img, Text, HStack, Input, Icon } from '@chakra-ui/react';
import { FiLogIn } from 'react-icons/fi';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Time &amp; Attendance</title>
      </Head>

      <Box bg="gray.900">
        <Container h="100vh" variant="center">
          <Flex justify="space-between" align="center">
            <Img src="/logotipo.svg" alt="Time &amp; Attendance" />

            <Link href="/login" passHref>
              <Button
                as="a"
                fontSize="lg"
                bg="gray.700"
                py="4"
                px="10"
                h="100%"
                transitionDuration="0.2s"
                _hover={{
                  bg: 'gray.800'
                }}
                _active={{
                  bg: 'gray.800'
                }}
              >
                Acesso Restrito
              </Button>
            </Link>
          </Flex>

          <HStack spacing="56" mt="20">
            <Box>
              <Heading
                fontSize="5xl"
                fontWeight="semibold"
                color="white"
                lineHeight="54px"
                maxWidth={410}
              >
                Registre seu ponto de maneira simples e fácil
              </Heading>

              <Text fontSize="xl" color="white" mt="6" maxWidth={331}>
                Acompanha seu ponto eletrônico diário de forma rápida e eficiente!
              </Text>

              <Input
                w={357}
                h="100%"
                mt="10"
                placeholder="Digite a matrícula do colaborador"
                bg="gray.800"
                color="gray.100"
                py="5"
                px="6"
                borderRadius="lg"
                borderColor="gray.800"
                focusBorderColor="red.500"
                _hover={{
                  borderColor: 'gray.800'
                }}
                _placeholder={{
                  color: 'gray.400'
                }}
              />

              <Button mt="6" w={357} h="100%">
                <Icon as={FiLogIn} boxSize="5" color="white" mr="2.5" />
                Registrar
              </Button>
            </Box>

            <Img src="/home-background.png" alt="Time &amp; Attendance" />
          </HStack>
        </Container>
      </Box>
    </>
  );
}
