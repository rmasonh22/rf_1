import {
  AcademicCapIcon,
  AnnotationIcon,
  BeakerIcon,
  CodeIcon,
  ServerIcon,
  ShieldCheckIcon,
  ThumbUpIcon,
  TrendingUpIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import ExportedImage from "next-image-export-optimizer";

const callouts = [
  {
    name: "Streamlined developer experience",
    description:
      "There are a hundred choices to make to create a modern web app. We have chosen a powerful but easy-to-use tech stack. You will be able to start from a solid foundation rather than plugging in all the essential elements yourself. Save days, if not weeks, of your time.",

    icon: CodeIcon,
  },
  {
    name: "Authentication Pages and Logic",
    description:
      "It would be best if you never implemented authentication yourself. Take the security of your users seriously and use existing solutions like Firebase Authentication from Google. \nWe pre-build the authentication (email + password) flow for you, including the sign-up, login, password reset pages, and the redirect to your website's protected pages.",
    icon: UsersIcon,
  },
  {
    name: "Chat widget",
    description:
      "The SaaS starter includes a chat widget for your users to contact you. Start an interactive chat discussion and notify the users via in-app chat messages and notifications - no need for expensive third-party providers to interact with your users.",
    icon: AnnotationIcon,
  },
  {
    name: "Serverless",
    description:
      "You don't have to worry about configuring servers, paying for unused capacity, and scaling. With the focus on serverless architecture, all chosen technologies will scale from one to millions of users without hiring a single backend expert.",
    icon: ServerIcon,
  },
  {
    name: "Security",
    description:
      "Make use of the best authentication and security practices. Rely on experts at Google to secure the infrastructure and build on the shoulder of giants. The documentation includes examples of security rules and unit tests of them.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Analytics",
    description:
      "Measure the performance of your React app in terms of page visits, session duration, event collection, and much more with Google Analytics 4. The analytic functionality is embedded in a GDPR-compliant way using a custom cookie banner.",
    icon: TrendingUpIcon,
  },
  {
    name: "Tests",
    description:
      "End-to-end test using Playwright with many examples based on this starter and security rules tests for Firestore with Mocha.",
    icon: BeakerIcon,
  },
  {
    name: "Documentation",
    description:
      "We try to make the use of this starter as seamless as possible. All the used technologies are documented, and by following our step-by-step guide, you will be setup within minutes.",
    icon: AcademicCapIcon,
  },
  {
    name: "Lifetime access and updates",
    description:
      "No subscription! Buy once and save yourself a lot of coding time now and enjoy all future updates! Use it for as many commercial and non-commercial websites as you like.",
    icon: ThumbUpIcon,
  },
];

export default function Features() {
  return (
    <div className="relative h-full">
      <div className="pointer-events-none absolute h-full w-full opacity-70">
        <ExportedImage
          src="/images/Features.png"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-6 lg:max-w-5xl lg:py-12">
          <div className="mt-6 space-y-12">
            {callouts.map((callout) => (
              <div key={callout.name} className={`mr-2 flex flex-row sm:px-10`}>
                <div className="mr-6 ml-2">
                  <callout.icon className="h-14 w-14 rounded-full bg-lightning-200 p-3 text-lightning-500" />
                </div>

                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {callout.name}
                  </p>
                  <h3 className="mt-3 text-justify text-base text-gray-700">
                    <span className="whitespace-pre-wrap">
                      {callout.description}
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
