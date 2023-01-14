import "next-auth";

/**
 * 기존 NextAuth의 Session iunterface와
 * Blended된 custom interface를 만들기 위함
 */
declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username: string;
  }
}
