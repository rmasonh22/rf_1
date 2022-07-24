import dynamic from "next/dynamic";
import Protected from "../components/Protected";
const Chat = dynamic(() => import("../components/Chat/ChatWidget/Chat"), {
  ssr: false,
});

import TechStackPage from "../components/ProtectedArea/TechStack";

function TechStack() {
  return (
    <Protected>
      <TechStackPage />
      <Chat />
    </Protected>
  );
}

export default TechStack;
