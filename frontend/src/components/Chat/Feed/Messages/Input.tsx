import { useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { Session } from "next-auth";
import { toast } from "react-hot-toast";

interface MessageInputProps {
  session: Session;
  conversationId: string;
}

const MessageInput = ({ session, conversationId }: MessageInputProps) => {
  const [messageBody, setMessageBody] = useState<string>("");

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // call snedMessage Mutation
    } catch (error: any) {
      console.log("[ERROR] onSendMessage", error);
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={5} width="100%">
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
