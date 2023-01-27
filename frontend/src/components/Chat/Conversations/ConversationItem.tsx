import { Stack, Text, Flex, Avatar, Box } from "@chakra-ui/react";
import { GoPrimitiveDot } from "react-icons/go";
import { formatDate, formatUsernames } from "@util/functions";
import { ConversationPopulated } from "../../../../../backend/src/util/types";

interface ConversationItemProps {
  userId: string;
  conversation: ConversationPopulated;
  onClick: () => void;
  selectedConversationId?: string;
}

const ConversationItem = ({
  userId,
  conversation,
  onClick,
  selectedConversationId,
}: ConversationItemProps) => {
  const handleClick = (event: React.MouseEvent) => {
    if (event.type === "click") {
      onClick();
    } else if (event.type === "contextmenu") {
      // event.preventDefault();
      // setMenuOpen(true);
    }
  };

  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      cursor="pointer"
      my={0.5}
      px={4}
      py={3}
      borderRadius={4}
      bg={
        conversation.id === selectedConversationId ? "whiteAlpha.200" : "none"
      }
      _hover={{ bg: "whiteAlpha.200" }}
      onClick={handleClick}
    >
      <Flex position="absolute" left="15px">
        {/* {hasSeenLatestMessage === false && ( */}
        <GoPrimitiveDot fontSize={18} color="#6B46C1" />
        {/* )} */}
      </Flex>
      <Avatar />
      <Flex
        justify="space-between"
        width="100%"
        height="100%"
        position="relative"
      >
        <Flex ml={1} direction="column" width="68%" height="100%">
          <Text
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {formatUsernames(conversation.participants, userId)}
          </Text>
          {conversation.latestMessage && (
            <Box width="140%">
              <Text
                color="whiteAlpha.700"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {conversation.latestMessage.body}
              </Text>
            </Box>
          )}
        </Flex>
        <Text
          color="whiteAlpha.700"
          textAlign="right"
          position="absolute"
          right={2}
          fontSize={13}
          lineHeight="24px"
        >
          {formatDate(conversation.updatedAt)}
        </Text>
      </Flex>
    </Stack>
  );
};

export default ConversationItem;
