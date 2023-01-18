import React, { useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
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
import { toast } from "react-hot-toast";
import { Session } from "next-auth";

import UserOprations from "@graphQL/user";
import ConversationOperations from "@graphQL/conversation";
import {
  CreateConversationData,
  CreateConversationInput,
  SearchedUser,
  SearchUsersData,
  SearchUsersInput,
} from "@util/types";

import UserSearchList from "./UserSearchList";
import Participants from "./Participants";

interface ModalProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModal = ({ session, isOpen, onClose }: ModalProps) => {
  const {
    user: { id: userId },
  } = session;

  const router = useRouter();

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

  const [createConversation, { loading: conversationCreateLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      ConversationOperations.Mutations.createConversation
    );
  /**
   * 선택한 유저와의 채팅룸 생성
   * participants의 id만 추리면 로그인한 유저의 id가 포함되어있지 않음
   * session에서 로그인 userId 정보 가져오기
   */
  const onCreateConversaion = async () => {
    const participantIds = [
      userId,
      ...participants.map((participant) => participant.id),
    ];

    try {
      const { data } = await createConversation({
        variables: { participantIds },
      });

      if (!data?.createConversation) {
        throw new Error("Failed to create conversation");
      }

      const {
        createConversation: { conversationId },
      } = data;

      router.push({ query: { conversationId } });
      /**
       * Clear state and Close Modal
       * on successful creation
       */
      setParticipants([]);
      setUsername("");
      onClose();
    } catch (error: any) {
      console.log("[ERROR] onCreateConversation : ", error);
      toast.error(error?.message);
    }
  };

  const onSearch = (event: React.FormEvent) => {
    // form은 submit하면 화면이 refresh되는 특징이 있음 >> 막음
    event.preventDefault();
    // searchUsers Query
    searchUsers({ variables: { username } });
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setParticipants([]);
          setUsername("");
          onClose();
        }}
      >
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
                  isLoading={conversationCreateLoading}
                  onClick={onCreateConversaion}
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
