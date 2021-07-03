import { Center, Flex, Image, Button, Icon, VStack, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

export function Sidebar() {
  const navigation = useRouter();
  const { signOut, isAuthenticated } = useAuth();

  return (
    <Flex
      as="aside"
      position="fixed"
      h="100%"
      bg="gray.900"
      direction="column"
      align="center"
      justify="space-between"
    >
      <Link href="/">
        <Center bg="red.500" h="20" w="20">
          <Image src="/logo-small.svg" alt="Time &amp; Attendance" />
        </Center>
      </Link>

      <VStack spacing="4" mb="8">
        {!!isAuthenticated && (
          <Button bg="black" h={10} w={10} onClick={signOut}>
            <Icon as={FiLogOut} boxSize={6} color="white" />
          </Button>
        )}

        <Button bg="black" h={10} w={10} onClick={navigation.back}>
          <Icon as={FiArrowLeft} boxSize={6} color="white" />
        </Button>
      </VStack>
    </Flex>
  );
}
