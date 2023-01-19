import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper = ({ session }: FeedWrapperProps) => {
  const router = useRouter();

  const { conversationId } = router.query;

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      direction="column"
      width="100%"
    >
      {conversationId ? (
        <Flex>{conversationId}</Flex>
      ) : (
        <div> No Conversation Selected</div>
      )}
    </Flex>
  );
};

export default FeedWrapper;
