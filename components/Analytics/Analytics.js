import { useEffect } from "react";
import useStore from "../StateManagement";
import { useCookies } from "react-cookie";

function Analytics() {
  const cookieChoiceUpdated = useStore((state) => state.cookieChoiceUpdated);

  const [cookies] = useCookies(["acceptStatistic"]);

  // the analyticScriptIsLoaded stores whether or not we already loaded the script to
  // prevent a second time load of it
  const analyticScriptIsLoaded = useStore(
    (state) => state.analyticScriptIsLoaded
  );
  const set = useStore((state) => state.set);

  useEffect(() => {
    // This effect gets triggered when the user made an interaction with the consent buttons
    // of the Cookie Banner

    // We are not collecting data if we are developing on localhost
    if (window.location.hostname === "localhost") return;

    // Get our Cookie to determine whether the user agreed to the statistical tracking or not
    const statisticCookie = cookies.acceptStatistic;
    // Function to load the gtag script from inside a component
    const appendAnalyticsScript = () => {
      const script = document.createElement("script");
      script.id = "google-analytics";
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GID}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        set((state) => {
          state.analyticScriptIsLoaded = true;
        });
      };
      document.body.append(script);
    };

    // Function to set options for a fully working analytics
    const setFullAnalyticsWithConsent = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
      gtag("set", "url_passthrough", true);
      gtag("set", { restricted_data_processing: false });

      gtag("js", new Date());

      gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GID, {
        anonymize_ip: false,
      });
      gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ADS_ID, {
        anonymize_ip: false,
      });
    };

    // Function to set options for a limited working and anonymous analytics
    const setAnonymousAnalytics = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      // Set a default the first time
      if (cookieChoiceUpdated === 0) {
        gtag("consent", "default", {
          ad_storage: "denied",
          analytics_storage: "denied",
        });
      } else {
        gtag("consent", "update", {
          ad_storage: "denied",
          analytics_storage: "denied",
        });
      }
      gtag("set", { restricted_data_processing: true });
      // gtag("set", "url_passthrough", true);
      gtag("js", new Date());

      gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GID, {
        anonymize_ip: true,
      });
    };

    // Function to delete all the cookies that are set by Google Analytics V4
    const deleteGoogleAnalyticsCookies = () => {
      const ga_Cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("_ga_"));
      if (ga_Cookie) {
        document.cookie = `${ga_Cookie}; Secure;max-age=1`;
      }
      const gaCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("_ga"));
      if (gaCookie) {
        document.cookie = `${gaCookie}; Secure;max-age=1`;
      }
      const gidCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("_gid"));
      if (gidCookie) {
        document.cookie = `${gidCookie}; Secure;max-age=1`;
      }
      const gac_gbCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("_gac_gb_"));
      if (gac_gbCookie) {
        document.cookie = `${gac_gbCookie}; Secure;max-age=1`;
      }
    };

    // Skip if the Google Analytics ID is undefined (Format it G-XXXXXX)
    if (
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GID === undefined ||
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GID === "" ||
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_GID === "G-XXXXXX"
    ) {
      return;
    }
    let timeout = null;
    // Load the script if it is not loaded yet
    if (!analyticScriptIsLoaded) {
      // append the script after 5 seconds
      timeout = setTimeout(() => {
        appendAnalyticsScript();
      }, 5000);
    }
    if (statisticCookie && statisticCookie === "true") {
      // we can use the analytics fully
      setFullAnalyticsWithConsent();
    } else {
      // we only use an restricted and anonymous version of the tracking
      setAnonymousAnalytics();
      // the gtag.js script does not delete the cookies on a change of consent
      // therefore we will dot it on our own
      deleteGoogleAnalyticsCookies();
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookieChoiceUpdated]);
  return null;
}

export default Analytics;
