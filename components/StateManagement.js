import create from "zustand";
import produce from "immer";

const useStore = create((set) => ({
  // Function to set state
  set: (fn) => set(produce(fn)),

  sidebarOpen: false,
  cookieChoiceUpdated: 0,
  cookieDetails: [
    {
      category: "Necessary",
      descriptionText:
        "Necessary cookies are essential for the function of the website and the website will not work in its intended way without them.",
      cookies: [
        {
          cookieName: "cookieChoiceDone",
          cookieDuration: "1 year",
          cookieService: "1st Party Cookie",
          cookieDescription:
            "Determines whether the user has given their consent by clicking on any of the accept buttons in the Cookie banner.",
        },
        {
          cookieName: "acceptStatistic",
          cookieDuration: "1 year",
          cookieService: "1st Party Cookie",
          cookieDescription:
            "Determines whether the user has given their consent to use statistic related cookies.",
        },
        {
          cookieName: "acceptMarketing",
          cookieDuration: "1 year",
          cookieService: "1st Party Cookie",
          cookieDescription:
            "Determines whether the user has given their consent to use marketing related cookies.",
        },
        {
          cookieName: "acceptExternalMedia",
          cookieDuration: "1 year",
          cookieService: "1st Party Cookie",
          cookieDescription:
            "Determines whether the user has given their consent to use cookies for loading external media.",
        },
      ],
    },
    {
      category: "Statistic",
      descriptionText:
        "Statistical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics the number of visitors, bounce rate, traffic source, etc.",
      cookies: [
        {
          cookieName: "_ga",
          cookieDuration: "2 years",
          cookieService: "Google Analytics",
          cookieDescription: "Used to distinguish users.",
        },
        {
          cookieName: "_gid",
          cookieDuration: "24 hours",
          cookieService: "Google Analytics",
          cookieDescription: "Used to distinguish users.",
        },
        {
          cookieName: "_ga_<container-id>",
          cookieDuration: "2 years",
          cookieService: "Google Analytics",
          cookieDescription: "Used to persist session state.",
        },
        {
          cookieName: "_gac_gb_<container-id>",
          cookieDuration: "90 days",
          cookieService: "Google Analytics",
          cookieDescription: "Contains campaign related information.",
        },
        {
          cookieName: "_GRECAPTCHA",
          cookieDuration: "90 days",
          cookieService: "Google Recaptcha",
          cookieDescription:
            "Used to provide risk analysis when using the website.",
        },
        {
          cookieName: "APISID, HSID, SAPISID, SID, SSID",
          cookieDuration: "2 years",
          cookieService: "Google Recaptcha",
          cookieDescription:
            "These Google security cookies help to authenticate the user, prevent the fraudulent use of login information and protect user data from unauthorized access.",
        },
      ],
    },
  ],
  // Array that contains the opened chats from the user
  chatRibbonArray: [],

  // Example state variable in the State Management Example page
  simpleCounter: 0,
  increaseSimpleCounter: () =>
    set((state) => ({ simpleCounter: state.simpleCounter + 1 })),
  clearSimpleCounter: () => set({ simpleCounter: 0 }),
  nestedState: { secondLevel: { thirdLevel: "Hard to get!" } },
}));
export default useStore;
