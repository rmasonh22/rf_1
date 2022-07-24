import Footer from "./Footer";
import CookieBanner from "../CookieBanner/CookieBanner";
import CookieDetails from "../CookieBanner/CookieDetails";
import ExportedImage from "next-image-export-optimizer";

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden">
        <div className="mx-auto">
          <div className="relative h-52 w-full">
            <ExportedImage
              src={"images/johannes-plenio-E-Zuyev2XWo-unsplash-2640w.jpg"}
              alt="Lightning Image"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </div>
        </div>
        <main>
          <div className="relative mt-4 px-4 py-8 pb-52 sm:mt-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-prose text-lg ">
              <h1>
                <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                  Privacy Policy
                </span>
              </h1>
            </div>
            <div className="prose-cerulean prose prose-lg mx-auto mt-6 text-gray-500">
              <p>Your privacy policy here</p>
              <h2>Header </h2>
              <p>Text</p>
            </div>
            <div className="not-prose mx-auto mt-4 max-w-3xl">
              <CookieBanner
                privacyPolicyLink={"/privacy"}
                showStatistic={true}
                showMarketing={false}
                showExternalMedia={false}
                isEmbedded={true}
              />
              <CookieDetails isEmbedded />
            </div>
          </div>
          <div className="fixed bottom-0 w-full">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

export default PrivacyPage;
