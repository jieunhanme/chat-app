import { gql } from "@apollo/client";

export const MessageFields = `
  id
  sender {
    id
    username
  }
  body
  createdAt
`;

// NOTE Opreation의 return 값이 boolean인 경우, 정의할 필요 없음
const message = {
  Queries: {
    messages: gql`
      query Messages($conversationId:String!) {
        messages(conversationId:$conversationId) {
            ${MessageFields}
        }
      }
    `,
  },
  Mutations: {
    sendMessage: gql`
      mutation SendMessage(
        $id: String!
        $conversationId: String!
        $senderId: String!
        $body: String!
      ) {
        sendMessage(
          id: $id
          conversationId: $conversationId
          senderId: $senderId
          body: $body
        )
      }
    `,
  },
  Subscriptions: {
    messageSent: gql`
      subscription MessageSent($conversationId: String!) {
        messageSent(conversationId: $conversationId){
          ${MessageFields}
        }
      }
    `,
  },
};

export default message;
