import { GraphQLError } from "graphql";
import { CreateConverationResponse, GraphQLContext } from "../../util/types";

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphQLContext
    ): Promise<CreateConverationResponse> => {
      const { participantIds } = args;
      const { session, prisma } = context;

      try {
        // await prisma.conversation.update({});
        return { conversationId: "" };
      } catch (error: any) {
        console.log("[ERROR] createConversation : ", error);
        throw new GraphQLError(error?.message);
      }

      return { conversationId: "" };
    },
  },
};

export default resolvers;
