import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Flex, Container, Box, Heading, VStack, Button, Text, useToast } from '@chakra-ui/react';
import { FiFileText, FiMail, FiPhone, FiUser } from 'react-icons/fi';

import { Sidebar } from '../../../components/Sidebar';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { AdminHeader } from '../../../components/AdminHeader';
import { Input } from '../../../components/Input';
import { api } from '../../../services/api';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Checkbox } from '../../../components/Checkbox';

interface Skill {
  id: number;
  name: string;
}

interface Collaborator {
  matriculation: string;
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  skills: Skill[];
}


interface RegisterProps {
  collaborator: Collaborator;
  skills: Skill[];
}

export default function Register({ collaborator, skills }: RegisterProps) {
  const [isLoadingUnvalidateButton, setIsLoadingUnvalidateButton] = useState(false);
  const [isLoadingValidateButton, setIsLoadingValidateButton] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const collaboratorSkills = collaborator.skills.map(skill => skill.id);

  async function validateCollaborator() {
    setIsLoadingValidateButton(true);

    try {
      await api.patch(`/collaborators/${collaborator.matriculation}/validate`);
      router.push('/admin/registers');
    } catch(err) {
      toast({
        status: 'error',
        title: 'Ocorreu um erro durante o processo de validação!',
        description: err.response.data.message,
        position: 'top-right',
        duration: 4000,
      });
    }

    setIsLoadingValidateButton(false);
  }

  async function unvalidateCollaborator() {
    setIsLoadingUnvalidateButton(true);

    try {
      await api.patch(`/collaborators/${collaborator.matriculation}/unvalidate`);
      router.push('/admin/registers');
    } catch(err) {
      toast({
        status: 'error',
        title: 'Ocorreu um erro durante o processo de validação!',
        description: err.response.data.message,
        position: 'top-right',
        duration: 4000,
      });
    }

    setIsLoadingUnvalidateButton(false);
  }

  return (
    <>
      <Head>
        <title>{collaborator.name} | Time &amp; Attendance</title>
      </Head>

      <Sidebar />

      <Flex direction="column" h="100vh" ml="20">
        <AdminHeader title={`Validação - ${collaborator.name}`} />

        <Container as="main" mt="20" pb="20" d="flex" justifyContent="center">
          <Box bg="gray.50" w={648} borderRadius="2xl" p="10">
            <Flex
              align="center"
              justify="space-between"
              mb="8"
              pb="6"
              borderBottom="1px"
              borderColor="gray.100"
            >
              <Heading fontSize="4xl" fontWeight="semibold" color="gray.600">
                Dados
              </Heading>

              <Text color="gray.300">
                Matrícula #{collaborator.matriculation}
              </Text>
            </Flex>

            <VStack spacing="4" align="flex-start">
              <Input
                name="name"
                placeholder="Nome"
                icon={FiUser}
                defaultValue={collaborator.name ?? ''}
                isDisabled
              />

              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                icon={FiMail}
                defaultValue={collaborator.email ?? ''}
                isDisabled
              />

              <Input
                name="cpf"
                placeholder="CPF"
                icon={FiFileText}
                mask="999.999.999-99"
                defaultValue={collaborator.cpf ?? ''}
                isDisabled
              />

              <Input
                name="phone_number"
                placeholder="Nº de telefone"
                icon={FiPhone}
                mask="+5\5 (99) 99999-9999"
                defaultValue={collaborator.phone_number ?? ''}
                isDisabled
              />
            </VStack>

            <Box mt="7">
              <Heading fontSize="xl" color="green.800" mb="4">Conhecimentos</Heading>

              <Checkbox 
                options={skills.map(skill => ({
                  value: skill.id,
                  label: skill.name
                }))}
                defaultValue={collaboratorSkills}
                isDisabled
              />
            </Box>

            <Flex w="100%" justify="flex-end" mt="8" gridGap="4">
              <Button
                type="submit"
                h="auto"
                w="50%"
                isLoading={isLoadingUnvalidateButton}
                onClick={unvalidateCollaborator}
              >
                Não validar
              </Button>

              <Button
                type="submit"
                colorScheme="green"
                h="auto"
                w="50%"
                isLoading={isLoadingValidateButton}
                onClick={validateCollaborator}
              >
                Validar
              </Button>
            </Flex>
          </Box>
        </Container>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({ params }) => {
  const { matriculation } = params;

  const { data: collaborator } = await api.get(`/collaborators/${matriculation}`);
  const { data: skills } = await api.get('/skills');
  
  return {
    props: {
      collaborator,
      skills
    },
  }
}, { isAdmin: true });