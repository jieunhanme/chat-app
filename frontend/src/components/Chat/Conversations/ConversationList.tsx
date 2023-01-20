import { Session } from "next-auth";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ConversationPopulated } from "../../../../../backend/src/util/types";

import ConversationModal from "./Modal/Modal";
import ConversationItem from "./ConversationItem";
import { useRouter } from "next/router";
interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationPopulated>;
  onViewConversation: (conversationId: string) => void;
}

const ConversationList = ({
  session,
  conversations,
  onViewConversation,
}: ConversationListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const router = useRouter();
  const { conversationId } = router.query;
  const {
    user: { id: userId },
  } = session;

  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start a Conversation
        </Text>
      </Box>
      <ConversationModal session={session} isOpen={isOpen} onClose={onClose} />
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          userId={userId}
          conversation={conversation}
          onClick={() => onViewConversation(conversation.id)}
          selectedConversationId={conversationId as string}
        />
      ))}
    </Box>
  );
};

export default ConversationList;
