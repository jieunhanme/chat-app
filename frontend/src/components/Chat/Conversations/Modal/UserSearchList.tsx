import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { SearchedUser } from "@util/types";

interface UserSearchListProps {
  users: Array<SearchedUser>;
}

const UserSearchList = ({ users }: UserSearchListProps) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>no Users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={2}
              key={user.id}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              <Avatar
                size="sm"
                src="https://w.namu.la/s/f986db15629379ccbbae27b58ec10acacb2903a87f8f9cb92f2a7e4eb3a23154c73b781193e38b2e6d355984ba4b676ae532b1aa598fa5a0064177639c59668a5a0bc2dd0415d73c66d1ee547dda4507"
              />
              <Flex justify="space-between" align="center" width="100%">
                <Text color="whiteAplha.700">{user.username}</Text>
                <Button
                  size="sm"
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  onClick={() => {}}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default UserSearchList;
