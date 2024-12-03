import Link from "next/link";
import { Button } from "../ui/button";
import Hero from "./hero";

export default function LandingHeading() {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
       <Button asChild variant="outline" className="rounded-full p-2">
       <Link
          href="#"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm"
          role="alert"
        >
          <span className="text-xs bg-gradient-to-tr from-indigo-800 via-blue-600 to-cyan-400 rounded-full text-white px-4 py-1.5 mr-3">
            New
          </span>{" "}
          <span className="text-sm font-medium">
            Gallerease is out! See what's new
          </span>
          <svg
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
       </Button>
        <h2 className="text-6xl text-center font-bold w-full mx-auto">
          <span className="bg-gradient-to-tr from-indigo-800 via-blue-600 to-cyan-400 text-transparent bg-clip-text">
            Gallerease
          </span>{" "}
          for Freelancers
        </h2>
        <p className="p-4 text-xl text-center w-full mx-auto">
          Collaborate with clients to make gallery management a quick and easy
          process.
        </p>
        <div className="flex flex-col mb-2 lg:mb-4 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Button asChild>
            <Link href="/getting-started">
              Learn more
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Link>
          </Button>
          <Button variant="outline" asChild>
          <Link
            href="#"
            className="inline-flex"
          >
            <svg
              className="mr-2 -ml-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
            </svg>
            Watch video
          </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
