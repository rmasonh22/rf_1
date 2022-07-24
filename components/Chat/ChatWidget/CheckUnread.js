import { useEffect } from "react";
import useStore from "../../StateManagement";
import shallow from "zustand/shallow";

function CheckUnread() {
  const { user, set } = useStore(
    (state) => ({
      user: state.user,
      set: state.set,
    }),
    shallow
  );

  useEffect(() => {
    if (!user) return;
    const checkForUnreadMessages = async () => {
      try {
        const { firestore } = await import("../../firebase-init");

        const { query, where, getDocs, collection, limit } = await import(
          "firebase/firestore"
        );
        if (!firestore) return;
        // The query get the last six unread messages (at max)
        const querySignedInUser =
          user && firestore
            ? query(
                collection(firestore, "chatUsers", user.uid, "chatMessages"),
                where("unread", "==", true),
                limit(6)
              )
            : null;
        if (querySignedInUser === null) return;

        const querySnapshot = await getDocs(querySignedInUser);
        set((state) => {
          state.unreadChatMessage = querySnapshot.size;
        });
      } catch (error) {
        console.log(error);
      }
    };
    checkForUnreadMessages();
  }, [user, set]);
  return null;
}

export default CheckUnread;
