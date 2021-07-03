import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Flex,
  Container,
  Text,
  Button,
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
import { GetServerSideProps } from 'next';
import { FiSearch, FiZoomIn } from 'react-icons/fi';
import { parseISO } from 'date-fns';

import { Sidebar } from '../../../components/Sidebar';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { api } from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';
import { AdminHeader } from '../../../components/AdminHeader';

interface Collaborator {
  name: string;
  matriculation: string;
  status: string;
  validated: boolean;
  created_at: string;
}

interface RegistersProps {
  collaborators: Collaborator[];
}

export default function Registers({ collaborators }: RegistersProps) {
  const [search, setSearch] = useState('');
  const [filteredCollaborators, setFilteredCollaborators] = useState<Collaborator[]>(collaborators);

  useEffect(() => {
    if(search) {
      const newCollaborators = collaborators.filter(collaborator =>
        collaborator.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
      );

      setFilteredCollaborators(newCollaborators);
    } else {
      setFilteredCollaborators(collaborators);
    }
  }, [search, collaborators]);

  return (
    <>
      <Head>
        <title>Registros | Time &amp; Attendance</title>
      </Head>

      <Sidebar />

      <Flex direction="column" h="100vh" ml="20">
        <AdminHeader title="Registro" />

        <Container as="main" mt="20" pb="20">
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
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </InputGroup>

            <Text color="gray.300">Total {collaborators.length} colaboradores</Text>
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
              {filteredCollaborators.map(collaborator => (
                <Tr key={collaborator.matriculation}>
                  <Td color="gray.900">{collaborator.name}</Td>
                  <Td color={collaborator.validated ? 'green.500' : 'red.500'}>
                    {collaborator.status}
                  </Td>
                  <Td color="gray.300">{collaborator.created_at}</Td>
                  <Td textAlign="end">
                    <Link href={`/admin/registers/${collaborator.matriculation}`} passHref>
                      <Button
                        as="a"
                        bg="green.500"
                        w="8"
                        h="8"
                        transition="filter .2s"
                        _hover={{ filter: 'brightness(0.9)' }}
                        _active={{ filter: 'brightness(0.9)' }}
                      >
                        <Icon as={FiZoomIn} boxSize={18} color="white" />
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Container>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const { data } = await api.get('/collaborators');

  const collaborators = data.map(collaborator => {
    return {
      ...collaborator,
      status: collaborator.validated ? 'Validado' : 'Não validado',
      created_at: formatDate(parseISO(collaborator.created_at), 'dd/MM/yyyy')
    }
  })

  return {
    props: {
      collaborators
    }
  }
}, { isAdmin: true });