import {
  Flex,
  Box,
  Container,
  Text,
  Heading,
  VStack,
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import { FiClipboard, FiFileText, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import Head from 'next/head';

import { Sidebar } from '../../components/Sidebar';
import { Input } from '../../components/Input';

export default function Register() {
  return (
    <>
      <Head>
        <title>Registro | Time &amp; Attendance</title>
      </Head>

      <Sidebar />

      <Flex direction="column" h="100vh" ml="20">
        <Flex as="header" borderBottom="1px" borderColor="#DEDEE3" h="20" py="5">
          <Container maxW={1128} d="flex" justifyContent="space-between" alignItems="center">
            <Text as="strong" fontSize="xl" color="gray.500">
              Registro
            </Text>

            <Button
              h="10"
              w="auto"
              p="0"
              bg="white"
              border="1px"
              borderColor="red.500"
              overflow="hidden"
              _hover={{ bg: 'white' }}
              _active={{ bg: 'white' }}
            >
              <Flex h="100%" bg="red.500" px="3" align="center">
                <Icon as={FiClipboard} boxSize={5} color="white" />
              </Flex>
              
              <Text
                px="4"
                color="gray.900"
                fontSize="sm"
                fontWeight="medium"
              >
                Matrícula #0001
              </Text>
            </Button>
          </Container>
        </Flex>

        <Container as="main" d="flex" alignItems="flex-start" mt="20" gridGap="7">
          <Box bg="gray.50" w={576} borderRadius="2xl" p="10">
            <Heading
              fontSize="4xl"
              fontWeight="semibold"
              color="gray.600"
              mb="8"
              pb="6"
              borderBottom="1px"
              borderColor="gray.100"
            >
              Dados
            </Heading>

            <Box as="form">
              <VStack spacing="4">
                <Input name="name" placeholder="Nome" icon={FiUser} />

                <Input type="email" name="email" placeholder="E-mail" icon={FiMail} />

                <Input
                  type="text"
                  name="cpf"
                  placeholder="CPF"
                  icon={FiFileText}
                  mask="999.999.999-99"
                />

                <Input
                  type="text"
                  name="phone_number"
                  placeholder="Nº de telefone"
                  icon={FiPhone}
                  mask="+5\5 (99) 99999-9999"
                />
              </VStack>

              <Flex w="100%" justify="flex-end" mt="7">
                {/* <Button
                  type="submit"
                  h="auto"
                  w={156}
                  bg="green.500"
                  transition="filter 0.2s"
                  _hover={{ filter: 'brightness(0.9)' }}
                >
                  Atualizar
                </Button> */}

                <Button type="submit" h="auto" w={156}>
                  Registrar
                </Button>
              </Flex>
            </Box>
          </Box>
        
          <VStack flex="1" spacing="7">
            <Box
              w="100%"
              bg="red.500"
              borderRadius="2xl"
              px="8"
              py="6"
              backgroundImage="url('/card-effect.svg')"
              backgroundRepeat="no-repeat"
              backgroundPosition="right"
            >
              <Heading
                fontSize="xl"
                fontWeight="semibold"
                color="white"
              >
                Bem-vindo! ✌
              </Heading>

              <Text fontSize="sm" color="white" mt="2.5" maxWidth={290}>
                Após o registro, você irá poder acompanhar seus pontos eletrônicos por aqui!
              </Text>
            </Box>

            {/* <Box w="100%" p="7" bg="gray.50" borderRadius="2xl">
              <Heading
                fontSize="2xl"
                fontWeight="semibold"
                color="gray.600"
              >
                Histórico
              </Heading>

              <Table mt="4">
                <Thead>
                  <Tr>
                    <Th>Data</Th>
                    <Th>Início</Th>
                    <Th>Encerramento</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>02 jul. 2021</Td>
                    <Td>15:00</Td>
                    <Td>20:00</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box> */}
          </VStack>
        </Container>
      </Flex>
    </>
  )
}