import { Avatar, Container, Flex, Text } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const { user } = useAuth();

  return (
    <Flex as="header" borderBottom="1px" borderColor="#DEDEE3" h="20" py="5">
      <Container maxW={1128} d="flex" justifyContent="space-between" alignItems="center">
        <Text as="strong" fontSize="xl" color="gray.500">
          {title}
        </Text>

        <Flex align="center">
          <Text color="gray.500" fontWeight="semibold" mr="4">
            {user?.name}
          </Text>
          <Avatar bg="gray.100" color="gray.300" name={user?.name} />
        </Flex>
      </Container>
    </Flex>
  )
}