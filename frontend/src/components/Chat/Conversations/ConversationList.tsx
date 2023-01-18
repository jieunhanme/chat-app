import { Session } from "next-auth";
import { Box, Text } from "@chakra-ui/react";
import ConversationModal from "./Modal/Modal";
import { useState } from "react";

interface ConversationListProps {
  session: Session;
}

const ConversationList = ({ session }: ConversationListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

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
    </Box>
  );
};

export default ConversationList;
