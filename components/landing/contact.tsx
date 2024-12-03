import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { ContactForm } from "../forms/contact-form";
import { Button } from "../ui/button";

export default function Contact() {
  return (
    <section>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-4 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <div className="flex items-center justify-evenly p-8">
            <Button size="icon">
                <FaGithub className="h-6 w-6" />
            </Button>
            <Button size="icon">
                <FaDiscord className="h-6 w-6" />
            </Button>
            <Button size="icon">
                <FaTwitter className="h-6 w-6" />
            </Button>
        </div>
        <div className="flex items-center justify-center">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
