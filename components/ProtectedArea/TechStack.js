import NavigationContainer from "./Navigation/NavigationContainer";
import Link from "next/link";
import MainLayout from "./MainLayout";
import PageHeader from "./PageHeader";
import PageDescriptionParagraph from "./PageDescriptionParagraph";
function TechStack() {
  const technologies = [
    {
      name: "React",
      docHref: "https://reactjs.org/docs/getting-started.html",
      description:
        "A modern way to build interactive UIs that are fast, simple, and responsive. Using components to compose your website will make your codebase easy to maintain, and you benefit from a huge ecosystem of libraries and a supportive community.",
    },
    {
      name: "Next.js",
      docHref: "https://nextjs.org/docs/getting-started",
      description:
        "Next.js provides you with a unique developer experience, bundling and routing without any complex set-up. It creates optimized production code ready to be deployed to the web.",
    },
    {
      name: "Authentication",
      docHref: "https://firebase.google.com/docs/auth",
      description:
        "Securing your data, users, and access is complex and to do it well incredibly time-consuming. Rely on the experts of Google by using Firebase Authentication.\n\nThis starter includes Login, Sign up and password forgot pages which are already wired up to email and password authentication. The authenticated user can directly and securely communicate with the database which you can explore in the Firestore example.",
    },

    {
      name: "Firebase",
      docHref: "https://firebase.google.com/docs/",
      description:
        "Providing well-built solutions from database, file storage, global CDN hosting, authentication to serverless backends. Everything you need to provide a rich, secure website that scales to millions of users.",
      exampleHref: "firebase",
    },
    {
      name: "Tailwind CSS",
      docHref: "https://tailwindcss.com/docs",
      description:
        "No more naming CSS classes! Tailwind is a utility-first CSS framework which allows you to build your UI quicker than ever — beautiful, consistent, responsive.\n\nFor an even bigger boost to your UI development speed, we recommend using the Tailwind UI Kit which saves you time and money in the creation of a beautiful, consistent and responsive UI.",
    },
    {
      name: "Zustand.js",
      docHref: "https://github.com/pmndrs/zustand",
      description:
        "One of the most powerful but equally easy to use state managers for React.",
      href: "https://github.com/pmndrs/zustand",
      exampleHref: "state-management",
    },
    {
      name: "Stripe",
      docHref: "https://stripe.com/docs",
      description:
        "Payments infrastructure for the internet -  Millions of businesses of all sizes use Stripe’s software and APIs to accept payments, send payouts, and manage their businesses online.",
      href: "https://stripe.com/",
      exampleHref: "payments",
    },
    {
      name: "Postmark",
      docHref: "https://postmarkapp.com/developer",
      description:
        "Send transactional and marketing emails and get them to the inbox on time, every time. Postmark is a fast and reliable email delivery service for developers.",
      href: "https://postmarkapp.com/",
    },
    {
      name: "Playwright",
      docHref: "https://playwright.dev/docs/intro",
      description:
        "Write end-to-end testing code seamlessly with Playwright. Comes with cross-browser tests and an interactive test code generator.",
      href: "https://playwright.dev/",
    },
  ];
  return (
    <NavigationContainer>
      <MainLayout>
        <PageHeader>Tech Stack</PageHeader>
        <PageDescriptionParagraph>
          We have chosen the following technologies and frameworks to make
          starting a React.js website as seamless as possible. Learn more about
          these by checking out the documentation pages.
        </PageDescriptionParagraph>

        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          {technologies.map((technology) => (
            <div
              key={technology.name}
              className="border-t border-gray-200 pt-4"
            >
              <dt className="font-medium text-gray-900">{technology.name}</dt>
              <dd className="mt-2 whitespace-pre-line text-justify text-sm text-gray-700">
                {technology.description}
              </dd>
              {technology.exampleHref && (
                <dd className="mt-2 text-sm text-gray-500">
                  <Link href={technology.exampleHref}>
                    <a className="underline">
                      Explore the sample used in this starter
                    </a>
                  </Link>
                </dd>
              )}
              <dd className="mt-2 text-sm text-gray-500">
                <Link href={technology.docHref}>
                  <a className="underline">Documentation</a>
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </MainLayout>
    </NavigationContainer>
  );
}

export default TechStack;
