function collectAnalyticsEvent({ eventName }) {
  // only execute it on the client
  function gtag() {
    window.dataLayer.push(arguments);
  }
  if (typeof window !== "undefined") {
    // Push the event to the dataLayer from which the
    // Google Analytics V4 script will read and process it
    window.dataLayer = window.dataLayer || [];
    gtag("event", eventName);
  }
}

export default collectAnalyticsEvent;
