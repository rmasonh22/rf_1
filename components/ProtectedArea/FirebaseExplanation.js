import Link from "next/link";
import FirebaseExample from "./FirebaseExample";
import MainLayout from "./MainLayout";
import NavigationContainer from "./Navigation/NavigationContainer";
import PageDescriptionParagraph from "./PageDescriptionParagraph";
import PageHeader from "./PageHeader";

function FirebaseLogo({ className }) {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
        <defs>
          <linearGradient
            id="d"
            x1="-108.63"
            y1="-692.24"
            x2="-58.56"
            y2="-742.31"
            gradientTransform="matrix(2.67 0 0 -2.67 317.23 -1808)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" stopOpacity=".1"></stop>
            <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="b"
            x1="56.9"
            y1="102.54"
            x2="48.9"
            y2="98.36"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#a52714"></stop>
            <stop offset=".4" stopColor="#a52714" stopOpacity=".5"></stop>
            <stop offset=".8" stopColor="#a52714" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            id="c"
            x1="90.89"
            y1="90.91"
            x2="87.31"
            y2="87.33"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#a52714" stopOpacity=".8"></stop>
            <stop offset=".5" stopColor="#a52714" stopOpacity=".21"></stop>
            <stop offset="1" stopColor="#a52714" stopOpacity="0"></stop>
          </linearGradient>
          <clipPath id="a">
            <path d="M143.41 47.34a4 4 0 00-6.77-2.16L115.88 66 99.54 34.89a4 4 0 00-7.08 0l-8.93 17-22.4-41.77a4 4 0 00-7.48 1.28L32 150l57.9 32.46a12 12 0 0011.7 0L160 150z"></path>
          </clipPath>
        </defs>
        <g clipPath="url(#a)">
          <path
            d="M32 150L53.66 11.39a4 4 0 017.48-1.27l22.4 41.78 8.93-17a4 4 0 017.08 0L160 150z"
            fill="#ffa000"
          ></path>
          <path
            opacity=".12"
            fill="url(#b)"
            d="M106 9L0 0v192l32-42L106 9z"
          ></path>
          <path
            d="M106.83 96.01l-23.3-44.12L32 150l74.83-53.99z"
            fill="#f57c00"
          ></path>
          <path opacity=".2" fill="url(#c)" d="M0 0h192v192H0z"></path>
          <path
            d="M160 150L143.41 47.34a4 4 0 00-6.77-2.16L32 150l57.9 32.47a12 12 0 0011.7 0z"
            fill="#ffca28"
          ></path>
          <path
            d="M143.41 47.34a4 4 0 00-6.77-2.16L115.88 66 99.54 34.89a4 4 0 00-7.08 0l-8.93 17-22.4-41.77a4 4 0 00-7.48 1.28L32 150h-.08l.07.08.57.28L115.83 67l20.78-20.8a4 4 0 016.78 2.16l16.45 101.74.16-.1zM32.19 149.81L53.66 12.39a4 4 0 017.48-1.28l22.4 41.78 8.93-17a4 4 0 017.08 0l16 30.43z"
            fill="#fff"
            fillOpacity=".2"
          ></path>
          <path
            d="M101.6 181.49a12 12 0 01-11.7 0l-57.76-32.4-.14.91 57.9 32.46a12 12 0 0011.7 0L160 150l-.15-.92z"
            style={{ isolation: "isolate" }}
            fill="#a52714"
            opacity=".2"
          ></path>
          <path
            d="M143.41 47.34a4 4 0 00-6.77-2.16L115.88 66 99.54 34.89a4 4 0 00-7.08 0l-8.93 17-22.4-41.77a4 4 0 00-7.48 1.28L32 150l57.9 32.46a12 12 0 0011.7 0L160 150z"
            fill="url(#d)"
          ></path>
        </g>
      </svg>
    </div>
  );
}

function FirebaseExplanation() {
  return (
    <NavigationContainer>
      <MainLayout>
        <PageHeader>
          Firebase
          <FirebaseLogo className="ml-4 h-10 w-10" />
        </PageHeader>

        <PageDescriptionParagraph>
          Using Firebase is like employing the best engineers from Google
          without the cost.
        </PageDescriptionParagraph>
        <PageDescriptionParagraph>
          <Link href="https://firebase.google.com/docs">
            <a
              className="mt-2 text-gray-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discover the full (and excellent) documentation{" "}
              <span className="underline">here</span>.
            </a>
          </Link>
        </PageDescriptionParagraph>
        <PageDescriptionParagraph>
          Short overview of the most commonly used Firebase features and links
          to their documentation:
        </PageDescriptionParagraph>
        <div className="mt-5 space-y-4 text-base text-gray-900">
          <h3 className="font-semibold">Authentication</h3>
          <ul
            role="list"
            className="mt-4 ml-4 list-disc space-y-2 pl-4 text-gray-700"
          >
            <li>
              Let your users authenticate to your app using various mechanisms:
              Email, Password, Social Logins (Google, Facebook, Apple, GitHub,
              ..)
            </li>
            <li>
              Easy integration to the other Firebase products which lets you
              secure your backend, database, and file serving.
            </li>
            <li>
              Provides basic transactional emails to communicate to your users
              for email verification and password reset.
            </li>
          </ul>
          <h3 className="font-semibold">Firestore</h3>
          <ul
            role="list"
            className="mt-4 ml-4 list-disc space-y-2 pl-4 text-gray-700"
          >
            <li>
              Scalable, cloud-hosted NoSQL database for keeping your data in
              sync.
            </li>
            <li>
              Users can directly communicate with their data using authenticated
              queries and receive real-time updates.
            </li>
            <li>
              Data is stored in so-called documents, organized in collections,
              and basically consists of key value pairs. There you can store
              primitives like strings, booleans, numbers but also nested complex
              objects and arrays.
            </li>
          </ul>
          <FirebaseExample />
          <h3 className="font-semibold">Hosting</h3>
          <ul
            role="list"
            className="mt-4 ml-4 list-disc space-y-2 pl-4 text-gray-700"
          >
            <li>
              Provides fast and secure hosting for your website on a global
              scale.
            </li>
            <li>
              Serves both static and dynamic content to a global CDN (content
              delivery network).
            </li>
            <li>
              Automatically caches your content for fastest response times.
            </li>
            <li>Deploying is as easy as running one command.</li>
            <li>
              Supports your custom domain and lets you view and test your
              changes before going live.
            </li>
          </ul>
          <h3 className="font-semibold">Cloud Functions</h3>
          <ul
            role="list"
            className="mt-4 ml-4 list-disc space-y-2 pl-4 text-gray-700"
          >
            <li>
              Cloud Functions are serverless backend code you automatically
              trigger in response to events from HTTPS requests, as well as
              Hooks to Database or File Storage changes.
            </li>
            <li>
              The code runs in a managed environment, so you don&apos;t have to
              manage, provision and secure your own servers.{" "}
            </li>
            <li>
              Scales down to zero cost and handles traffic spikes seamlessly.
            </li>
          </ul>
          <h3 className="font-semibold">File storage</h3>
          <ul
            role="list"
            className="mt-4 ml-4 list-disc space-y-2 pl-4 text-gray-700"
          >
            <li>
              Cloud Storage lets you store files such as photos, videos, PDFs,
              etc.
            </li>
            <li>
              Highly available and you can store Gigabytes to Exabytes of data
              if you need to.
            </li>
            <li>
              Restrict access based on user authentication, file location, name
              and other metadata.
            </li>
            <li>
              Upload and download directly from clients without going through
              your own backend.
            </li>
          </ul>
        </div>
      </MainLayout>
    </NavigationContainer>
  );
}

export default FirebaseExplanation;
