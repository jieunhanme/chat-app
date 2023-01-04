import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth = ({ session, reloadSession }: IAuthProps) => {
  const [username, setUsername] = useState<string>("");

  const onSubmit = async () => {
    try {
      // TODO createUsername Mutation to send our username to the GraphQL API
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  return (
    <Center height="100vh" border="1px solid gray">
      <Stack align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Button width="100%" onClick={onSubmit}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">Chat App QL</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={
                <Image height="20px" src="/images/google_logo.png" alt="logo" />
              }
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
