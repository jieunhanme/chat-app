const typeDefs = `#graphql
    scalar Date

    type Query {
        conversations: [Conversation]
    }

    type Mutation {
        createConversation(participantIds:[String]): CreateConversationResponse
    }

    type Subscription {
      conversationCreated: Conversation
    }
    
    type CreateConversationResponse {
        conversationId :String
    }

    type Conversation {
        id: String
        latestMessage: Message
        participants: [Participant]
        createdAt: Date
        updatedAt: Date
    }

    type Participant {
        id: String
        user: User
        hasSeenLatestMessage: Boolean
    }
`;

export default typeDefs;
