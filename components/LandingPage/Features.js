/* This example requires Tailwind CSS v2.0+ */
import { DocumentTextIcon, KeyIcon } from "@heroicons/react/solid";
const features = [
  {
    name: "Next.js",
    description:
      "Next.js provides a unique developer experience, bundling and routing without any complex setup. It creates optimized production code ready to be deployed to the web.",
    image: <img width={32} height={32} src="/nextjs-32x32.png" alt="" />,
  },
  {
    name: "React",
    description:
      "A modern way to build interactive UIs that are fast, simple, and responsive. Using components to compose your app will make your codebase easy to maintain, and you benefit from a vast ecosystem of libraries and support.",
    image: (
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
        alt=""
        className="translate-y-0.5 transform"
      />
    ),
  },
  {
    name: "Firebase",
    description:
      "Providing well-built, documented, and scalable solutions from database, file storage, global CDN hosting, and authentication to serverless backends. Everything you need to provide a rich, secure app that scales to millions of users.",
    image: (
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
    ),
  },
  {
    name: "Tailwind CSS",
    description:
      "No more naming CSS classes! Tailwind is a utility-first CSS framework that allows you to build your UI quicker than ever - beautiful, consistent, and responsive.",
    image: (
      <svg
        viewBox="0 0 248 31"
        className="h-4 w-auto translate-y-1 -translate-x-px transform"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
          fill="#06B6D4"
        ></path>
      </svg>
    ),
  },
  {
    name: "Stripe Payments",
    description:
      "Payments infrastructure for the internet -  Collect one-off or subscription payments from people worldwide.",
    image: (
      <svg
        viewBox="0 0 60 25"
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="25"
        className="w-8 -translate-x-[3px]"
      >
        <path
          fill="var(--userLogoColor, #0A2540)"
          d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"
          fillRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    name: "Postmark",
    description:
      "Send transactional and marketing emails and get them to the inbox on time, every time. Postmark is a fast and reliable email delivery service for developers.",
    image: (
      <svg
        fill="none"
        height="30"
        viewBox="0 0 30 30"
        width="30"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-auto"
      >
        <path
          clipRule="evenodd"
          d="m2 0h4.31582v1.5789h6.31578v-1.5789h4.7361v1.57863h6.3158v-1.57863h4.3165c1.1046 0 2 .895431 2 2v4.31577h-1.5791v6.31583h1.5791v4.7368h-1.5791v6.3158h1.5791v4.3158c0 1.1046-.8954 2-2 2h-4.3165v-1.5793h-6.3158v1.5793h-4.7361v-1.579h-6.31578v1.579h-4.31582c-1.10457 0-2-.8954-2-2v-4.3158h1.57911v-6.3158h-1.57911v-4.7369h1.57879v-6.31577h-1.57879v-4.31573c0-1.10457.895431-2 2-2zm17.4202 15.3701c.8526-.8594 1.279-1.9806 1.279-3.3636 0-1.1145-.1947-2.00748-.5841-2.67887-.3895-.6781-1.034-1.18164-1.9336-1.51062-.893-.32898-2.1015-.49347-3.6255-.49347h-5.64975v1.89331h1.89335v11.39005h-1.89335v1.8933h6.16335v-1.8933h-1.9739v-3.9276h1.994c2.0343-.0134 3.4778-.4498 4.3305-1.3092zm-1.8833-5.48857c.5573.43637.8359 1.12797.8359 2.07457 0 .7452-.1309 1.3294-.3928 1.7523-.2618.4163-.6713.7117-1.2286.8863-.5572.1678-1.3025.2517-2.2357.2517h-1.42v-5.62955h1.5811c1.3495 0 2.3029.22156 2.8601.66468z"
          fill="#fade4b"
          fillRule="evenodd"
        />
        <path
          d="m20.6992 12.0065c0 1.383-.4264 2.5042-1.279 3.3636-.8527.8594-2.2962 1.2958-4.3305 1.3092h-1.994v3.9276h1.9739v1.8933h-6.16335v-1.8933h1.89335v-11.39005h-1.89335v-1.89331h5.64975c1.524 0 2.7325.16449 3.6255.49347.8996.32898 1.5441.83252 1.9336 1.51062.3894.67139.5841 1.56437.5841 2.67887zm-2.3264-.0504c0-.9466-.2786-1.6382-.8359-2.07458-.5572-.44311-1.5106-.66467-2.8601-.66467h-1.5811v5.62955h1.42c.9332 0 1.6785-.0839 2.2357-.2517.5573-.1746.9668-.47 1.2286-.8863.2619-.4229.3928-1.0071.3928-1.7523z"
          fill="#333"
        />
      </svg>
    ),
  },
  {
    name: "Cookie Banner",
    description:
      "Includes a non-intrusive and GDPR-compliant cookie banner. Limits functionality of certain scripts like Analytics and Ads before the user accepts the use.",
    icon: DocumentTextIcon,
  },
  {
    name: "Authentication",
    description:
      "Securing your data, users, and access is complex and time-consuming if you want to do it well. Rely on the experts of Google by using Firebase Authentication.",
    icon: KeyIcon,
  },
];

export default function Features() {
  return (
    <div className="py-12" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-lightning-600">
            React SaaS Template
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            A better way to start your next SaaS business
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-700 lg:mx-auto">
            Coding from scratch each time you start a new project is painful,
            takes a long time, and does not add value. Jump right into creating
            your core product and build on top of a proven and scalable tech
            stack.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 px-4 sm:px-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-lightning-100 ring ring-lightning-400">
                    {feature.icon && (
                      <feature.icon
                        className="h-6 w-6 text-lightning-500"
                        aria-hidden="true"
                      />
                    )}
                    {feature.image && (
                      <div className="h-6 w-6" aria-hidden="true">
                        {feature.image}
                      </div>
                    )}
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-justify text-base text-gray-700">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
