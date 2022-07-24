import dynamic from "next/dynamic";
import Protected from "../components/Protected";
const Chat = dynamic(() => import("../components/Chat/ChatWidget/Chat"), {
  ssr: false,
});
import GettingStartedPage from "../components/ProtectedArea/GettingStarted";

function GettingStarted() {
  return (
    <Protected>
      <GettingStartedPage />
      <Chat />
    </Protected>
  );
}

export default GettingStarted;
