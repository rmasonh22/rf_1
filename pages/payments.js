import dynamic from "next/dynamic";
import Protected from "../components/Protected";
const Chat = dynamic(() => import("../components/Chat/ChatWidget/Chat"), {
  ssr: false,
});

import PaymentsPage from "../components/ProtectedArea/PaymentsPage";

function Payments() {
  return (
    <Protected>
      <PaymentsPage />
      <Chat />
    </Protected>
  );
}

export default Payments;
