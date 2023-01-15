import { CreateUsernameResponse, GraphQLContext } from "../../util/types";

const resolvers = {
  Query: {
    searchUsers: (username: String) => {},
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        return {
          error: "Not Authorized",
        };
      }

      const { id: userId } = session.user;

      try {
        /**
         * Check that username is not taken
         */
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        // NOTE 중복되는 username이 있는 경우 object로, 없는 경우 null로 return
        if (existingUser) {
          return {
            error: "Username already taken. Try anothor",
          };
        }
        /**
         * Update User
         */
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });
        /**
         * Success to Update Username
         */
        return {
          success: true,
        };
      } catch (error: any) {
        console.log("[ERROR] createUsername : ", error);
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default resolvers;
