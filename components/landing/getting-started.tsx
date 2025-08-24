export default function GettingStarted() {
    return (
        <section>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        Welcome to Gallerease! Manage and integrate image galleries with ease.
                    </h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        Our app simplifies gallery management for developers working on client
                        websites. With just a few steps, you can create accounts, set up
                        galleries, manage images, and integrate them seamlessly into your
                        client’s website using our REST API.
                    </p>
                </div>
                <div className="flex-1 max-w-5xl mx-auto px-6 py-10 space-y-10">
                    <section className="space-y-8">
                        <StepCard title="1. Creating an Account">
                            <ol className="list-decimal ml-6 space-y-2">
                                <li>
                                    Visit{" "}
                                    <a
                                        href="https://gallerease.dev/auth/login"
                                        className="text-black dark:text-white underline"
                                    >
                                        gallerease.dev/auth/login
                                    </a>{" "}
                                    and select an OAuth Provider.
                                </li>
                                <li>Verify your email address using the link sent to your inbox.</li>
                            </ol>
                        </StepCard>

                        <StepCard title="2. Creating Sites and Galleries">
                            <ol className="list-decimal ml-6 space-y-2">
                                <li>
                                    Log in and go to the <span className="font-medium">Overview</span>{" "}
                                    section.
                                </li>
                                <li>
                                    Click <span className="font-medium">Create New Site</span> and
                                    provide a site name and optional description.
                                </li>
                                <li>
                                    Select the site and click <span className="font-medium">Add Gallery</span>.
                                </li>
                            </ol>
                        </StepCard>

                        <StepCard title="3. Adding and Configuring Images">
                            <ol className="list-decimal ml-6 space-y-2">
                                <li>
                                    Open the gallery and click{" "}
                                    <span className="font-medium">Upload Images</span>.
                                </li>
                                <li>Drag-and-drop or select files from your computer.</li>
                                <li>Configure image settings (titles, descriptions, tags).</li>
                            </ol>
                        </StepCard>

                        <StepCard title="4. Allowing Users to Add Images">
                            <ol className="list-decimal ml-6 space-y-2">
                                <li>
                                    Select the gallery and click{" "}
                                    <span className="font-medium">Generate Temporary Link</span>.
                                </li>
                                <li>
                                    Set expiration and optional restrictions (max uploads, file types).
                                </li>
                                <li>
                                    Share the link with clients so they can upload directly.
                                </li>
                            </ol>
                        </StepCard>

                        <StepCard title="5. Creating an API Key">
                            <ol className="list-decimal ml-6 space-y-2">
                                <li>
                                    Go to <span className="font-medium">Account Settings → API Keys</span>.
                                </li>
                                <li>
                                    Click <span className="font-medium">Generate New Key</span> and
                                    give it a name (e.g., <code>Client A Gallery</code>).
                                </li>
                                <li>Copy and securely store the key for API access.</li>
                            </ol>
                        </StepCard>

                        <StepCard title="6. Retrieving Image Data via REST API">
                            <p className="mb-3">Use the following endpoint to fetch gallery images:</p>
                            <CodeBlock>
                                {`GET https://api.yourappurl.com/v1/sites/{site_id}/galleries/{gallery_id}/images
Headers:
  x-api-key: YOUR_API_KEY`}
                            </CodeBlock>
                            <p className="mt-3">Example JSON response:</p>
                            <CodeBlock>
                                {`{
  "images": [
    {
      "id": "12345",
      "title": "Sunset",
      "description": "A beautiful sunset.",
      "url": "https://yourappurl.com/uploads/sunset.jpg"
    }
  ]
}`}
                            </CodeBlock>
                        </StepCard>
                    </section>
                </div>
            </div>
        </section>
    )
}

/* ---- Helper Components ---- */

function StepCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl shadow p-6 border transition-colors duration-300">
            <h2 className="text-2xl font-semibold mb-3">{title}</h2>
            {children}
        </div>
    );
}

function CodeBlock({ children }: { children: string }) {
    return (
        <pre className="bg-[#1B1B1F] text-gray-100 text-sm rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
            {children}
        </pre>
    );
}