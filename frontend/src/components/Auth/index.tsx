import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

import UserOperations from "@graphQL/user";
import { CreateUsernameData, CreateUserNameVariables } from "@util/types";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth = ({ session, reloadSession }: IAuthProps) => {
  console.log("🚀 ~ file: index.tsx:16 ~ Auth ~ session", session);
  const [username, setUsername] = useState<string>("");

  /**
   * TypeScript를 위한 Type정의를 추가해야 좋은 코드!
   * graphql/user에서 정의한 Type은 grqphql을 위한 정의이기 때문!!
   * 추가 설명
   * @createUsername : biz에서 해당 graphql을 사용하는 function명
   * @CreateUsernameData : Response의 Type
   * @CreateUserNameVariables : Request의 Type
   */
  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUserNameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    try {
      if (!username) return;
      await createUsername({ variables: { username } });
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  console.log("HERE IS DATA : ", data, loading, error);

  return (
    <Center height="100vh" border="1px solid gray">
      <Stack align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(event) => setUsername(event.target.value.trim())}
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
