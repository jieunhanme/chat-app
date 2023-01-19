import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useQuery } from "@apollo/client";

import ConversationList from "./ConversationList";
import ConversationOperations from "@graphQL/conversation";
import { ConversationsData } from "@util/types";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper = ({ session }: ConversationsWrapperProps) => {
  const {
    data: conversationsData,
    loading: conversationsLoading,
    error: conversationsError,
  } = useQuery<ConversationsData, null>(
    ConversationOperations.Queries.conversations
  );

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
