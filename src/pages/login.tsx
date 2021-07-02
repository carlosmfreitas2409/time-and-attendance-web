import { Button, Box, Flex, Heading, Text, VStack, Icon, Img } from "@chakra-ui/react";
import Link from "next/link";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";

import { Input } from "../components/Input";

export default function Login() {
  return (
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

        <Box as="form">
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
            <Input name="email" placeholder="Email" icon={FiMail} />

            <Input type="password" name="password" placeholder="Senha" icon={FiLock} />
          </VStack>

          <Button type="submit" w="100%" h="auto" mt="6">
            Login
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}