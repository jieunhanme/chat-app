import { participantPopulated } from "../../../backend/src/util/types";

/**
 * 로그인 유저를 제외한 참가자 목록
 * @param participants
 * @param myUserId
 * @returns string
 */
export const formatUsernames = (
  participants: Array<participantPopulated>,
  myUserId: string
) => {
  const usernames = participants
    .filter((participant) => participant.user.id !== myUserId)
    .map((participant) => participant.user.username);

  return usernames.join(", ");
};
