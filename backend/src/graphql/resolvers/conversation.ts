import { GraphQLError } from "graphql";
import { GraphQLContext } from "../../util/types";
import { Prisma } from "@prisma/client";

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphQLContext
    ): Promise<{ conversationId: string }> => {
      const { participantIds } = args;
      const { session, prisma } = context;

      if (!session?.user) {
        throw new GraphQLError("Not Authorized");
      }

      const {
        user: { id: userId },
      } = session;

      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === userId,
                })),
              },
            },
          },
          include: conversationPolutated,
        });

        // emit a CONVERSATION_CREATED event using pubsub

        return { conversationId: conversation.id };
      } catch (error: any) {
        console.log("[ERROR] createConversation : ", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
};

export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        username: true,
      },
    },
  });

export const conversationPolutated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantPopulated,
    },
    latestMessage: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    },
  });

export default resolvers;
