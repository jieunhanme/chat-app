import { Avatar, Flex, Stack, Text, Box } from "@chakra-ui/react";

import { formatMessageItemDate } from "@util/functions";
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
        <Flex align="flex-top">
          <Avatar />
        </Flex>
      )}
      <Stack spacing={1} width="100%">
        {!sentByMe && (
          <Stack
            direction="row"
            align="center"
            justify={sentByMe ? "flex-end" : "flex-start"}
          >
            <Text fontWeight={500} textAlign="left">
              {message.sender.username}
            </Text>
          </Stack>
        )}
        <Flex
          direction={sentByMe ? "row-reverse" : "row"}
          justify="flex-start"
          alignItems="flex-end"
          position="relative"
        >
          <Box
            bg={sentByMe ? "brand.100" : "whiteAlpha.100"}
            px={3}
            py={1}
            borderRadius={12}
            maxWidth="65%"
            _after={{
              borderColor: "transparent",
              borderTopColor: sentByMe ? "brand.100" : "whiteAlpha.100",
              borderWidth: sentByMe ? "10px 10px 0 0" : "10px 0 0 10px",
              borderStyle: "solid",
              content: '""',
              position: "absolute",
              top: "9px",
              left: sentByMe ? "" : "-9.8px",
              right: sentByMe ? "-9.8px" : "",
            }}
          >
            <Text>{message.body}</Text>
          </Box>
          <Text fontSize={12} color="whiteAlpha.700" px={2}>
            {formatMessageItemDate(message.createdAt)}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default MessageItem;
