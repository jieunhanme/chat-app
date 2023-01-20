import { useMutation } from "@apollo/client";
import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

import UserOperations from "@graphQL/user";
import { CreateUsernameData, CreateUserNameVariables } from "@util/types";
import { toast } from "react-hot-toast";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth = ({ session, reloadSession }: IAuthProps) => {
  const [username, setUsername] = useState<string>("");

  /**
   * TypeScript를 위한 Type정의를 추가해야 좋은 코드!
   * graphql/user에서 정의한 Type은 grqphql을 위한 정의이기 때문!!
   * 추가 설명
   * @createUsername : biz에서 해당 graphql을 사용하는 function명
   * @CreateUsernameData : Response의 Type
   * @CreateUserNameVariables : Request의 Type
   */
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUserNameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    if (!username.trim()) return;

    try {
      const { data } = await createUsername({
        variables: { username: username.trim() },
      });

      if (!data?.createUsername) {
        throw new Error();
      }
      // backend 에서 정의한  error message
      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        throw new Error(error);
      }
      /**
       * Reload Session to Obtain new username
       */
      toast.success("Username successfully created! ✨");

      reloadSession();
    } catch (error: any) {
      toast.error(error?.message);
      console.log("onSubmit error", error);
    }
  };

  return (
    <Center height="100vh">
      <Stack align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Button width="100%" onClick={onSubmit} isLoading={loading}>
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
