import { Flex } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";

import MesssagesHeader from "./Messages/Header";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper = ({ session }: FeedWrapperProps) => {
  const router = useRouter();
  const { conversationId } = router.query;

  const {
    user: { id: userId },
  } = session;

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      direction="column"
      width="100%"
    >
      {conversationId && typeof conversationId === "string" ? (
        <Flex
          direction="column"
          justify="space-between"
          overflow="hidden"
          flexGrow={1}
        >
          <MesssagesHeader userId={userId} conversationId={conversationId} />
          {/* <Messages /> */}
        </Flex>
      ) : (
        <div> No Conversation Selected</div>
      )}
    </Flex>
  );
};

export default FeedWrapper;
