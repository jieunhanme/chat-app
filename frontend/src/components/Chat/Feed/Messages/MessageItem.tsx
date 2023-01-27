import { Avatar, Flex, Stack, Text, Box } from "@chakra-ui/react";

import { formatDate } from "@util/functions";
import { MessagePopulated } from "../../../../../../backend/src/util/types";

interface MessageItemProps {
  message: MessagePopulated;
  sentByMe: boolean;
}

const MessageItem = ({ message, sentByMe }: MessageItemProps) => {
  return (
    <Stack
      direction="row"
      p={4}
      spacing={4}
      borderRadius={4}
      _hover={{
        bg: "whiteAlpha.100",
      }}
      wordBreak="break-word"
    >
      {!sentByMe && (
        <Flex align="flex-end">
          <Avatar size="sm" />
        </Flex>
      )}
      <Stack spacing={1} width="100%">
        <Stack
          direction="row"
          align="center"
          justify={sentByMe ? "flex-end" : "flex-start"}
        >
          {!sentByMe && (
            <Text fontWeight={500} textAlign="left">
              {message.sender.username}
            </Text>
          )}
          <Text fontSize={14} color="whiteAlpha.700">
            {formatDate(message.createdAt, true)}
          </Text>
        </Stack>
        <Flex justify={sentByMe ? "flex-end" : "flex-start"}>
          <Box
            bg={sentByMe ? "brand.100" : "whiteAlpha.100"}
            px={3}
            py={1}
            borderRadius={12}
            maxWidth="65%"
          >
            <Text>{message.body}</Text>
          </Box>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default MessageItem;
