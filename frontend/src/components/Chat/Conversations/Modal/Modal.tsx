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
import { SearchedUser, SearchUsersData, SearchUsersInput } from "@util/types";
import UserSearchList from "./UserSearchList";
import Participants from "./Participants";
import { toast } from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal = ({ isOpen, onClose }: ModalProps) => {
  const [username, setUsername] = useState<string>("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  /**  NOTE useQuery vs useLazyQuery
   * @useQuery : components render가 완료되자마자 실행(async, await 필요)
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

  const onCreateConversaion = async () => {
    try {
      // createConversation mutation
    } catch (error: any) {
      console.log("[ERROR] onCreateConversation : ", error);
      toast.error(error?.message);
    }
  };

  /**
   * 대화 상대 추가
   * @param user 추가할 유저 정보
   */
  const addParticipants = (user: SearchedUser) => {
    setParticipants((prev) => [...new Set<SearchedUser>([...prev, user])]);
    setUsername("");
  };

  /**
   * 대화 상대 제거
   * @param userId 제거할 유저 아이디
   */
  const removeParticipants = (userId: string) => {
    setParticipants((prev) => prev.filter((user) => user.id !== userId));
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
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                addParticipants={addParticipants}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipants={removeParticipants}
                />
                <Button
                  bg="brand.100"
                  width="100%"
                  mt={6}
                  _hover={{ bg: "brand.100" }}
                  onClick={() => {}}
                >
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
