import { ConversationPopulated } from "../../../backend/src/util/types";

/**
 * User
 */
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUserNameVariables {
  username: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
}

/**
 * Conversation
 */
export interface ConversationsData {
  conversations: Array<ConversationPopulated>;
}

export interface CreateConversationInput {
  participantIds: Array<string>;
}

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}
