import { Session } from "next-auth";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper = ({ session }: FeedWrapperProps) => {
  return <div>FeedWrapper</div>;
};

export default FeedWrapper;
