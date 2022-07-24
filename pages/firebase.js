import dynamic from "next/dynamic";
import Protected from "../components/Protected";
const Chat = dynamic(() => import("../components/Chat/ChatWidget/Chat"), {
  ssr: false,
});

import FirebaseExplanation from "../components/ProtectedArea/FirebaseExplanation";

function FirebasePage() {
  return (
    <Protected>
      <FirebaseExplanation />
      <Chat />
    </Protected>
  );
}

export default FirebasePage;
