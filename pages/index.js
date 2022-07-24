import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import collectAnalyticsEvent from "../components/Analytics/collectAnalyticsEvent";
const Chat = dynamic(() => import("../components/Chat/ChatWidget/Chat"), {
  ssr: false,
});
import LandingPage from "../components/LandingPage/LandingPage";

// This page will be rendered at the root of the website. E.g.: www.example.com/
export default function Root() {
  const [loadChat, setLoadChat] = useState(false);
  // We wil load the chat only after a few seconds to speed up the page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadChat(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Add event listener for Gumroad purchase
  useEffect(() => {
    const handleGumroadPurchase = (e) => {
      if (e.data && JSON.parse(e.data).post_message_name == "sale") {
        collectAnalyticsEvent({
          eventName: `purchase_reactappstarter`,
        });
        collectAnalyticsEvent({
          eventName: "LK_sCMP4tqYDEKbuk7kC",
        });
      }
    };
    window.addEventListener("message", handleGumroadPurchase, false);
    return () => {
      window.removeEventListener("message", handleGumroadPurchase, false);
    };
  }, []);
  return (
    <>
      <LandingPage />
      {loadChat && <Chat />}
    </>
  );
}
