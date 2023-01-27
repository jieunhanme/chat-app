import { useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { ObjectID } from "bson";

import MessageOperations from "@graphQL/message";
import { SendMessageArguments } from "../../../../../../backend/src/util/types";

interface MessageInputProps {
  session: Session;
  conversationId: string;
}

const MessageInput = ({ session, conversationId }: MessageInputProps) => {
  const [messageBody, setMessageBody] = useState<string>("");

  const [sendMessage] = useMutation<
    { sendMessage: boolean },
    SendMessageArguments
  >(MessageOperations.Mutations.sendMessage);

  const {
    user: { id: userId },
  } = session;

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const messageId = new ObjectID().toString();
      const newMessage: SendMessageArguments = {
        id: messageId,
        conversationId: conversationId,
        senderId: userId,
        body: messageBody,
      };

      const { data, errors } = await sendMessage({
        variables: newMessage,
      });

      if (!data?.sendMessage || errors) {
        throw new Error("Failed to send message");
      }

      setMessageBody("");
    } catch (error: any) {
      console.log("[ERROR] onSendMessage", error);
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={4} width="100%">
      <form onSubmit={onSendMessage}>
        <Input
          value={messageBody}
          onChange={(event) => setMessageBody(event.target.value)}
          size="md"
          resize="none"
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "whiteAlpha.300",
          }}
        />
      </form>
    </Box>
  );
};

export default MessageInput;
