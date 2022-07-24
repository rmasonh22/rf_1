import Protected from "../../components/Protected";
import ChatPage from "../../components/Chat/ChatPage/ChatPage";

function Chat() {
  return (
    <Protected adminOnly={true}>
      <ChatPage />
    </Protected>
  );
}

export default Chat;
