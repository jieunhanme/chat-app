import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

import {
  MessagePopulated,
  ParticipantPopulated,
} from "../../../backend/src/util/types";

/**
 * 로그인 유저를 제외한 참가자 목록
 * @param participants
 * @param myUserId
 * @returns string
 */
export const formatUsernames = (
  participants: Array<ParticipantPopulated>,
  myUserId: string
) => {
  const usernames = participants
    .filter((participant) => participant.user.id !== myUserId)
    .map((participant) => participant.user.username);

  return usernames.join(", ");
};

/**
 * date-fns로 날짜 형식 뽑기
 */
// NOTE 채팅방에서 가장 최근 메시지 날짜 형식
export const formatConversationDate = (date: string) => {
  const d = new Date(date);

  const now = Date.now();
  const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
  if (diff < 60 * 1) {
    // 1분 미만일땐 방금 전 표기
    return "방금 전";
  }
  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  //  PPP는 날짜, EEE는 요일, p는 시간 "PPP EEE p"
  // addSuffix : 접미사 붙이기 ( ...전, ...후 )
  return format(d, "yyyy.MM.dd", { locale: ko }); // 날짜 포맷
};

// NOTE 메시지 개개별 시간
export const formatMessageItemDate = (date: string) => {
  const d = new Date(date);
  return format(d, "a hh:mm", { locale: ko });
};

// NOTE 메시지를 날짜별로 묶기 위한 기준
export const formatMessageGroupDate = (date: string) => {
  const d = new Date(date);
  return format(d, "PPP EEEE", { locale: ko });
};
/**
 * Message 그룹 묶기
 */
export const messageGroupBy = (
  data: Array<MessagePopulated>,
  splitby: string
) => {
  const result = data.reduce((acc, item) => {
    var key = formatMessageGroupDate(item[splitby]);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
  return result;
};
