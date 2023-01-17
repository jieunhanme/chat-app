import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import UserOprations from "@graphQL/user";
import { SearchUsersData, SearchUsersInput } from "@util/types";
import UserSearchList from "./UserSearchList";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal = ({ isOpen, onClose }: ModalProps) => {
  const [username, setUsername] = useState<string>("");
  /**  NOTE useQuery vs useLazyQuery
   * @useQuery : components render가 완료되자마자 실행
   * @useLazyQuery : 이 query가 실행되는 타이밍을 확실히 정할 수 있음
   * search user는 Button을 누를때 실행해야하는 특정 타이밍이 있기 때문에 useLazyQuery사용
   */
  const [searchUsers, { data, loading, error }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOprations.Queries.searchUsers);

  const onSearch = (event: React.FormEvent) => {
    // form은 submit하면 화면이 refresh되는 특징이 있음 >> 막음
    event.preventDefault();
    // searchUsers Query
    searchUsers({ variables: { username } });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Button type="submit" disabled={!username} isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && <UserSearchList users={data.searchUsers} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
