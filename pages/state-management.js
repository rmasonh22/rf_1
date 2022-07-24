import dynamic from "next/dynamic";
import Protected from "../components/Protected";
const Chat = dynamic(() => import("../components/Chat/ChatWidget/Chat"), {
  ssr: false,
});

import StateExplanation from "../components/ProtectedArea/StateExplanation";

function StateManagement() {
  return (
    <Protected>
      <StateExplanation />
      <Chat />
    </Protected>
  );
}

export default StateManagement;
