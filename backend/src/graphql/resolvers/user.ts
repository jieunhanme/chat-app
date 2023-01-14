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
    ) => {
      const { username } = args;
      const { session, prisma } = context;
      console.log("🚀 ~ file: user.ts:15 ~ session", session);

      if (!session?.user) {
        return {
          error: "Not Authorized",
        };
      }

      const { id } = session.user;

      try {
        /**
         * Check that username is not taken
         */
        console.log("TEST", id);
      } catch (error) {
        console.log("[ERROR] createUsername : ", error);
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default resolvers;
