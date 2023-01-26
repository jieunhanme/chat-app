import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useQuery } from "@apollo/client";

import ConversationList from "./ConversationList";
import ConversationOperations from "@graphQL/conversation";
import { ConversationsData } from "@util/types";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import SkeletonLoader from "@components/common/SkeletonLoader";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper = ({ session }: ConversationsWrapperProps) => {
  const router = useRouter();
  const { conversationId } = router.query;

  const {
    data: conversationsData,
    loading: conversationsLoading,
    error: conversationsError,
    subscribeToMore,
  } = useQuery<ConversationsData, null>(
    ConversationOperations.Queries.conversations
  );

  /**
   * 채팅방 목록에서 채팅 틀릭시
   * 1. Router query param으로 선택한 conversation ID 전달
   * 2. 선택한 채팅방에 읽지 않은 메시지가 있었던 경우 false로 값 갱신
   */
  const onViewConversation = async (conversationId: string) => {
    router.push({ query: { conversationId } });
  };

  const subscribeToNewConversations = () => {
    subscribeToMore({
      document: ConversationOperations.Subscriptions.conversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;
        const newConversation = subscriptionData.data.conversationCreated;
        // return 값으로 새로운 conversationsData를 반환
        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  /**
   * Execute subscription on mount
   */
  useEffect(() => {
    subscribeToNewConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
    >
      {conversationsLoading ? (
        <SkeletonLoader count={7} height="70px" />
      ) : (
        <ConversationList
          session={session}
          conversations={conversationsData?.conversations || []}
          onViewConversation={onViewConversation}
        />
      )}
    </Box>
  );
};

export default ConversationsWrapper;
