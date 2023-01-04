import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

interface IChatProps {}

const Chat = (props: IChatProps) => {
  return (
    <div>
      CHAT
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default Chat;