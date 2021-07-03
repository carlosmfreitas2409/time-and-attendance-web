import Head from "next/head";
import {
  Flex,
  Container,
  Text,
  Button,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import { Sidebar } from "../../components/Sidebar";
import { FiSearch, FiZoomIn } from "react-icons/fi";

export default function Registers() {
  return (
    <>
      <Head>
        <title>Registros | Time &amp; Attendance</title>
      </Head>

      <Sidebar />

      <Flex direction="column" h="100vh" ml="20">
        <Flex as="header" borderBottom="1px" borderColor="#DEDEE3" h="20" py="5">
          <Container maxW={1128} d="flex" justifyContent="space-between" alignItems="center">
            <Text as="strong" fontSize="xl" color="gray.500">
              Registro
            </Text>

            <Flex align="center">
              <Text color="gray.500" fontWeight="semibold" mr="4">
                John Doe
              </Text>
              <Avatar bg="gray.100" color="gray.300" name="John Doe" />
            </Flex>
          </Container>
        </Flex>

        <Container as="main" mt="20">
          <Flex
            align="center"
            justify="space-between"
            pb="6"
            mb="6"
            borderBottom="1px"
            borderColor="#DEDEE3"
          >
            <InputGroup w="auto">
              <InputLeftElement
                pointerEvents="none"
                h="12"
                ml="2"
                fontSize="2xl"
              >
                <Icon as={FiSearch} color="gray.300"/>
              </InputLeftElement>
              <Input
                placeholder="Buscar..."
                w="auto"
                h="12"
                pl="14"
                bg="gray.50"
                borderRadius="lg"
                borderColor="gray.50"
                focusBorderColor="red.500"
                _hover={{ borderColor: 'gray.50' }}
                _placeholder={{ color: 'gray.200' }}
              />
            </InputGroup>

            <Text color="gray.300">Total 2 colaboradores</Text>
          </Flex>

          <Table mt="4">
            <Thead>
              <Tr>
                <Th>Colaborador</Th>
                <Th>Status</Th>
                <Th>Criado em</Th>
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td color="gray.900">John Doe</Td>
                <Td color="green.500">Validado</Td>
                <Td color="gray.300">13/04/2020</Td>
                <Td textAlign="end">
                  <Button
                    bg="green.500"
                    w="8"
                    h="8"
                    transition="filter .2s"
                    _hover={{ filter: 'brightness(0.9)' }}
                    _active={{ filter: 'brightness(0.9)' }}
                  >
                    <Icon as={FiZoomIn} boxSize={18} color="white" />
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td color="gray.900">John Doe</Td>
                <Td color="green.500">Validado</Td>
                <Td color="gray.300">13/04/2020</Td>
                <Td textAlign="end">
                  <Button
                    bg="green.500"
                    w="8"
                    h="8"
                    transition="filter .2s"
                    _hover={{ filter: 'brightness(0.9)' }}
                    _active={{ filter: 'brightness(0.9)' }}
                  >
                    <Icon as={FiZoomIn} boxSize={18} color="white" />
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Container>
      </Flex>
    </>
  )
}