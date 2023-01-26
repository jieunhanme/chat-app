import { useQuery } from "@apollo/client";
import { Flex, Stack } from "@chakra-ui/react";
import { toast } from "react-hot-toast";

import MessageOperations from "@graphQL/message";
import { MessagesData, MessagesVariables } from "@util/types";

interface MessagesProps {
  userId: string;
  conversationId: string;
}

const Messages = ({ userId, conversationId }: MessagesProps) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    MessagesData,
    MessagesVariables
  >(MessageOperations.Queries.messages, {
    variables: {
      conversationId,
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  return (
    <Flex direction="column" justify="flex-end" overflow="hidden">
      {loading && (
        <Stack>
          {/* <SkeletonLoader count={4} height="60px" width="100%"/> */}
          <span>LOADING MESSAGES</span>
        </Stack>
      )}
      {data?.messages && (
        <Flex direction="column-reverse" overflowY="scroll" height="100%">
          {data.messages.map((message) => (
            // <MessageItem />
            <div key={message.id}>{message.body}</div>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Messages;
