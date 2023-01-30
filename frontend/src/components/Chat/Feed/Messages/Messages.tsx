import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { toast } from "react-hot-toast";

import MessageOperations from "@graphQL/message";
import {
  MessagesData,
  MessagesVariables,
  MessageSubscriptionData,
} from "@util/types";
import SkeletonLoader from "@components/common/SkeletonLoader";
import MessageGroup from "./MessageGroup";

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

  const subscribeToMoreMessages = (conversationId: string) => {
    subscribeToMore({
      document: MessageOperations.Subscriptions.messageSent,
      variables: {
        conversationId,
      },
      updateQuery: (prev, { subscriptionData }: MessageSubscriptionData) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageSent;

        return Object.assign({}, prev, {
          messages: [newMessage, ...prev.messages],
        });
      },
    });
  };

  // NOTE 대화방 목록과는 다르게 메시지 피드는 채팅방별로 webSocket이 필요하기 때문에 conversationId 의존을 걸어야 한다.
  useEffect(() => {
    const unsubscribe = subscribeToMoreMessages(conversationId);
    return () => unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  if (error) {
    return null;
  }

  return (
    <Flex direction="column" justify="flex-end" overflow="hidden">
      {loading && <SkeletonLoader count={4} height="60px" />}
      {data?.messages && (
        <Flex overflowY="auto" height="100%" px={4} pt={4}>
          <MessageGroup userId={userId} messages={data.messages} />
        </Flex>
      )}
    </Flex>
  );
};

export default Messages;
