import dynamic from "next/dynamic";
import Protected from "../components/Protected";
const Chat = dynamic(() => import("../components/Chat/ChatWidget/Chat"), {
  ssr: false,
});
import ProfilePage from "../components/ProtectedArea/Profile/ProfilePage";

function Profile() {
  return (
    <Protected>
      <ProfilePage />
      <Chat />
    </Protected>
  );
}

export default Profile;
