import { gql } from "@apollo/client";

const ConversationFields = `
  id
  participants {
    user {
      id
      username
    }
    hasSeenLatestMessage
  }
  latestMessage {
    id
    sender {
      id
      username
    }
    body
    createdAt
  }
  updatedAt
`;

const Conversation = {
  Queries: {
    conversations: gql`
      query Conversations {
        conversations {
          ${ConversationFields}
        } 
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConverSation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {
    conversationCreated: gql`
    subscription ConversationCreated {
      conversationCreated {
        ${ConversationFields}
      }
    }`,
  },
};

export default Conversation;
