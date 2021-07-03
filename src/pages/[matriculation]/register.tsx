import { useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
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
  Td,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { FiClipboard, FiFileText, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { parseISO } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Sidebar } from '../../components/Sidebar';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { formatDate, formatDistance } from '../../utils/formatDate';
import { useRouter } from 'next/router';
import { Checkbox } from '../../components/Checkbox';

type CollaboratorFormData = {
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  skills: Array<number>;
}

interface Appointment {
  id: number;
  created_date: string;
  created_hour: string;
  closed_hour: string;
  closed_at: string | null;
  created_at: string;
  inProgress: boolean;
}

interface Skill {
  id: number;
  name: string;
}

interface Collaborator {
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  matriculation: string;
  appointments: Appointment[];
  skills: Skill[];
}

interface RegisterProps {
  collaborator: Collaborator | null;
  skills: Skill[];
}

const collaboratorFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório').max(100, 'Máximo de 100 caracteres'),
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido').max(100, 'Máximo de 100 caracteres'),
  cpf: Yup.string().required('CPF obrigatório'),
  phone_number: Yup.string().optional(),
  skills: Yup.array().of(Yup.number()).min(1, 'No mínimo um conhecimento').max(3, 'No máximo três conhecimentos')
});

export default function Register({ collaborator, skills }: RegisterProps) {
  const [isLoadingAppointment, setIsLoadingAppointment] = useState(false);

  const appointmentInProgress = collaborator?.appointments.find(appointment => !appointment.closed_at);
  const collaboratorSkills = collaborator?.skills?.map(skill => skill.id);

  const toast = useToast();
  const router = useRouter();
  const { handleSubmit, formState, control } = useForm({
    resolver: yupResolver(collaboratorFormSchema),
  });

  const { errors } = formState;

  const welcomeCardMessage = useMemo(() => {
    if(!collaborator) {
      return 'Após o registro, você irá poder acompanhar seus pontos eletrônicos por aqui!';
    } else {  
      if(appointmentInProgress) { 
        var now = new Date();
        var utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        
        const time = formatDistance(parseISO(appointmentInProgress.created_at), utcDate);

        return `Você possui um ponto que está sendo gravado a ${time}!`;
      }
  
      return 'Você pode acompanhar, iniciar e encerrar seu ponto eletrônico por aqui!';
    }
  }, [collaborator, appointmentInProgress]);
  
  function copyMatriculationToClipboard() {
    navigator.clipboard.writeText(collaborator.matriculation);

    toast({
      status: 'success',
      title: 'Copiado para a área de transferência!',
      position: 'top-right',
      duration: 4000
    });
  }

  async function handleRecordAppointment() {
    setIsLoadingAppointment(true);
    
    await api.post(`/appointments/${collaborator.matriculation}`);

    toast({
      status: 'success',
      title: 'Seu ponto está sendo gravado!',
      position: 'top-right',
      duration: 4000
    });

    setIsLoadingAppointment(false);
  }

  async function handleStopAppointment() {
    setIsLoadingAppointment(true);

    await api.patch(`/appointments/${collaborator.matriculation}/close`);

    toast({
      status: 'success',
      title: 'Seu ponto foi salvo!',
      position: 'top-right',
      duration: 4000
    });

    setIsLoadingAppointment(false);
  }

  async function handleFormCollaborator(data: CollaboratorFormData) {
    const dataFormatted = {
      ...data,
      cpf: data.cpf.replace(/\D/g, ""),
      phone_number: data.phone_number ? data.phone_number.replace(/\D/g, "") : null
    }
    
    try {
      if(!collaborator) {
        await api.post('/collaborators', dataFormatted);
  
        router.push('/');
  
        toast({
          status: 'success',
          title: 'Colaborador cadastrado, aguarde validação!',
          position: 'top-right',
          duration: 4000
        });
  
        return;
      }
  
      await api.put(`/collaborators/${collaborator.matriculation}`, dataFormatted);
  
      router.push('/');
  
      toast({
        status: 'success',
        title: 'Colaborador atualizado, aguarde validação!',
        position: 'top-right',
        duration: 4000
      });
    } catch(err) {
      toast({
        status: 'error',
        title: 'Ocorreu um erro durante o registro!',
        description: err.response.data.message,
        position: 'top-right',
        duration: 4000,
      })
    }
  }  

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

            {collaborator && (
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
                onClick={copyMatriculationToClipboard}
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
                    Matrícula #{collaborator.matriculation}
                  </Text>
              </Button>
            )}
          </Container>
        </Flex>

        <Container as="main" pb="10" d="flex" alignItems="flex-start" mt="20" gridGap="7">
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

            <Box as="form" onSubmit={handleSubmit(handleFormCollaborator)}>
              <VStack spacing="4" align="flex-start">
                <Controller
                  render={({ field }) => <Input placeholder="Nome" icon={FiUser} error={errors.name} {...field} />}
                  name="name"
                  control={control}
                  defaultValue={collaborator?.name}
                />

                <Controller
                  render={({ field }) => <Input type="email" placeholder="E-mail" icon={FiMail} error={errors.email} {...field} />}
                  name="email"
                  control={control}
                  defaultValue={collaborator?.email}
                />

                <Controller
                  render={({ field }) => <Input placeholder="CPF" mask="999.999.999-99" icon={FiFileText} error={errors.cpf} {...field} />}
                  name="cpf"
                  control={control}
                  defaultValue={collaborator?.cpf}
                />

                <Controller
                  render={({ field }) => <Input placeholder="Nº de telefone" mask="+5\5 (99) 99999-9999" icon={FiPhone} error={errors.phone_number} {...field} />}
                  name="phone_number"
                  control={control}
                  defaultValue={collaborator?.phone_number}
                />
              </VStack>

              <Box mt="7">
                <Heading fontSize="xl" color="green.800" mb="4">Conhecimentos</Heading>

                <Controller
                  name="skills"
                  control={control}
                  defaultValue={collaboratorSkills}
                  render={({ field }) => (
                    <Checkbox
                      options={skills.map(skill => ({
                        value: skill.id,
                        label: skill.name
                      }))}
                      error={errors.skills}
                      {...field}
                    />
                  )}
                />
              </Box>

              <Flex w="100%" justify="flex-end" mt="8">
                {collaborator ? (
                  <Button
                    type="submit"
                    h="auto"
                    w={156}
                    bg="green.500"
                    transition="filter 0.2s"
                    _hover={{ filter: 'brightness(0.9)' }}
                    isLoading={formState.isSubmitting}
                  >
                    Atualizar
                  </Button>
                ) : (
                  <Button type="submit" h="auto" w={156} isLoading={formState.isSubmitting}>
                    Registrar
                  </Button>
                )}
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
                {collaborator
                  ? `Bem-vindo, ${collaborator.name.split(' ')[0]}! ✌`
                  : 'Bem-vindo! ✌'
                }
              </Heading>

              <Text fontSize="sm" color="white" mt="2.5" maxWidth={290}>
                {welcomeCardMessage}
              </Text>
              
              {collaborator && (
                <HStack spacing="4" mt="4">
                  {!appointmentInProgress ? (
                    <Button
                      isLoading={isLoadingAppointment}
                      bg="transparent"
                      border="2px"
                      borderColor="white"
                      _hover={{ bg: 'white', color: 'gray.900' }}
                      onClick={handleRecordAppointment}
                    >
                      Iniciar
                    </Button>
                  ) : (
                    <Button
                      isLoading={isLoadingAppointment}
                      bg="transparent"
                      border="2px"
                      borderColor="white"
                      _hover={{ bg: 'white', color: 'gray.900' }}
                      onClick={handleStopAppointment}
                    >
                      Encerrar
                    </Button>
                  )}
                </HStack>
              )}
            </Box>

            {collaborator && collaborator.appointments.length > 0 && (
              <Box w="100%" p="7" bg="gray.50" borderRadius="2xl">
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
                    {collaborator.appointments.map(appointment => (
                      <Tr key={appointment.id}>
                        <Td>{appointment.created_date}</Td>
                        <Td>{appointment.created_hour}</Td>
                        <Td>{appointment.closed_hour}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </VStack>
        </Container>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { matriculation } = params;

  const { data: skills } = await api.get('/skills');

  try {
    const { data } = await api.get(`/collaborators/${matriculation}`);

    const collaborator = {
      ...data,
      appointments: data.appointments.map(appointment => ({
        ...appointment,
        inProgress: !appointment.closed_at,
        created_date: formatDate(parseISO(appointment.created_at), 'dd MMM yyyy'),
        created_hour: formatDate(parseISO(appointment.created_at), 'HH:mm'),
        closed_hour: appointment.closed_at 
          ? formatDate(parseISO(appointment.closed_at), 'HH:mm')
          : 'Atualmente',
      })).sort((a, b) => a.closed_at < b.closed_at ? 1 : -1)
    }
    
    return {
      props: {
        collaborator,
        skills
      },
    }
  } catch {
    return {
      props: {
        collaborator: null,
        skills
      },
    }
  }
}