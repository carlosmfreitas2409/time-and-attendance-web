import { Center, Flex, Image, Button, Icon } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

export function Sidebar() {
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
      <Center bg="red.500" h="20" w="20">
        <Image src="/logo-small.svg" alt="Time &amp; Attendance" />
      </Center>

      <Button bg="black" h={10} w={10} mb="8">
        <Icon as={FiArrowLeft} boxSize={6} color="white" />
      </Button>
    </Flex>
  );
}
