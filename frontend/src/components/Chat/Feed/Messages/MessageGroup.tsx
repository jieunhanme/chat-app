import { Box, Flex } from "@chakra-ui/react";
import { messageGroupBy } from "@util/functions";
import { MessagePopulated } from "../../../../../../backend/src/util/types";
import MessageDate from "./MessageDate";
import MessageItem from "./MessageItem";

interface MessageGroupProps {
  userId: string;
  messages: Array<MessagePopulated>;
}

const MessageGroup = ({ userId, messages }: MessageGroupProps) => {
  /** FIXME
   * 1. 지금은 groupby를 UI에서 진행중이지만, prisma에 해당 기능이 update되면 적용 필요
   * 2. groupby를 > date, user, time (카톡처럼 UI 변경 필요)
   */
  const object = messageGroupBy(messages, "createdAt");

  return (
    <Box width="100%">
      {Object.keys(object)
        .reverse()
        .map((date, index) => (
          <Box key={index}>
            <MessageDate titleDate={date} />
            <Flex direction="column-reverse">
              {object[date].map((message: MessagePopulated) => (
                <MessageItem
                  key={message.id}
                  message={message}
                  sentByMe={message.sender.id === userId}
                />
              ))}
            </Flex>
          </Box>
        ))}
    </Box>
  );
};

export default MessageGroup;
