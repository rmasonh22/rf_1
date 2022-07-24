function collectConversionEvent({ eventName }) {
  // only execute it on the client
  function gtag() {
    window.dataLayer.push(arguments);
  }
  if (typeof window !== "undefined") {
    // Push the event to the dataLayer from which the
    // Google Analytics V4 script will read and process it
    window.dataLayer = window.dataLayer || [];
    if (
      process.env.NEXT_PUBLIC_GOOGLE_ADS_ID &&
      process.env.NEXT_PUBLIC_GOOGLE_ADS_ID !== ""
    ) {
      gtag("event", "conversion", {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${eventName}`,
      });
    }
  }
}

export default collectConversionEvent;
