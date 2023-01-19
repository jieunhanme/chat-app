import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useQuery } from "@apollo/client";

import ConversationList from "./ConversationList";
import ConversationOperations from "@graphQL/conversation";
import { ConversationsData } from "@util/types";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import { useEffect } from "react";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper = ({ session }: ConversationsWrapperProps) => {
  const {
    data: conversationsData,
    loading: conversationsLoading,
    error: conversationsError,
    subscribeToMore,
  } = useQuery<ConversationsData, null>(
    ConversationOperations.Queries.conversations
  );

  console.log("🚀 USERQUERY DATA: ", conversationsData);

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
        console.log("🚀 SUBSCRIPTION DATA: ", subscriptionData);

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
    <Box width={{ base: "100%", md: "400px" }} bg="whiteAlpha.50" py={6} px={3}>
      {/* Skeleton Loader */}
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations || []}
      />
    </Box>
  );
};

export default ConversationsWrapper;
