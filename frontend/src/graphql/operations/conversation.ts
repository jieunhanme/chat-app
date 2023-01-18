import { gql } from "@apollo/client";

const Conversation = {
  Queries: {},
  Mutations: {
    createConversation: gql`
      mutation CreateConverSation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {},
};

export default Conversation;
