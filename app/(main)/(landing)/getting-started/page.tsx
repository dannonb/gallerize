export default function GettingStartedPage() {
  return (
    <div>
      <div className="min-h-screen p-6">
    
        <main className="max-w-4xl mx-auto mt-8 space-y-8">
          {/* Getting Started */}
          <section>
            <h2 className="text-3xl font-semibold">
              Getting Started
            </h2>
            <p className="mt-2">
              Welcome to <strong>Gallerease</strong>! Our app simplifies
              gallery management for developers working on client websites. With
              just a few steps, you can create accounts, set up galleries,
              manage images, and integrate them seamlessly into your client’s
              website using our REST API.
            </p>
          </section>

          {/* 1. Creating an Account */}
          <section>
            <h3 className="text-2xl font-semibold">
              1. Creating an Account
            </h3>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>
                Visit{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  [gallerease.dev/auth/login]
                </a>{" "}
                and click whichever <strong>OAuth Provider</strong> you prefer.
              </li>
              <li>
                Verify your email address using the link sent to your inbox.
              </li>
            </ol>
          </section>

          {/* 2. Creating Sites and Galleries */}
          <section>
            <h3 className="text-2xl font-semibold">
              2. Creating Sites and Galleries
            </h3>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>
                Log in to your account and navigate to the{" "}
                <strong>Overview</strong> section.
              </li>
              <li>
                Click <strong>Create New Site</strong> and provide:
                <ul className="list-disc list-inside ml-6">
                  <li>Site Name</li>
                  <li>Description (optional)</li>
                </ul>
              </li>
              <li>
                Once the site is created, select it and click{" "}
                <strong>Add Gallery</strong>.
                <ul className="list-disc list-inside ml-6">
                  <li>Enter the gallery name (e.g., &quot;Homepage Gallery&quot;).</li>
                  <li>Add a description or tags to organize your galleries.</li>
                </ul>
              </li>
            </ol>
          </section>

          {/* 3. Adding and Configuring Images */}
          <section>
            <h3 className="text-2xl font-semibold">
              3. Adding and Configuring Images
            </h3>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>Open the desired gallery.</li>
              <li>
                Click <strong>Upload Images</strong> and drag-and-drop files or
                select them from your computer.
              </li>
              <li>
                Configure image settings:
                <ul className="list-disc list-inside ml-6">
                  <li>Add titles, descriptions, and tags.</li>
                </ul>
              </li>
            </ol>
          </section>

          {/* 4. Allowing Users to Add Images */}
          <section>
            <h3 className="text-2xl font-semibold">
              4. Allowing Users to Add Images
            </h3>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>Select the gallery you want to share.</li>
              <li>
                Click <strong>Generate Temporary Link</strong>.
                <ul className="list-disc list-inside ml-6">
                  <li>Set an expiration date for the link.</li>
                  <li>
                    (Optional) Add restrictions, like max number of uploads or
                    specific file types.
                  </li>
                </ul>
              </li>
              <li>Share the link with your client.</li>
            </ol>
            <p className="mt-2">
              Clients can upload images directly, and you’ll be notified once
              uploads are complete.
            </p>
          </section>

          {/* 5. Creating an API Key */}
          <section>
            <h3 className="text-2xl font-semibold">
              5. Creating an API Key
            </h3>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>
                Navigate to your <strong>Account Settings</strong>.
              </li>
              <li>
                Click <strong>API Keys</strong> and select{" "}
                <strong>Generate New Key</strong>.
                <ul className="list-disc list-inside ml-6">
                  <li>
                    Provide a name for the key (e.g., &quot;Client A Gallery
                    Access&quot;).
                  </li>
                </ul>
              </li>
              <li>
                Copy and securely store the key. You’ll need it to access the
                REST API.
              </li>
            </ol>
          </section>

          {/* 6. Retrieving Image Data via REST API */}
          <section>
            <h3 className="text-2xl font-semibold">
              6. Retrieving Image Data via REST API
            </h3>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>
                Use the API endpoint for your gallery:
                <pre className="bg-[#2323] p-4 rounded-md mt-2">
                  <code>
                    GET https://api.yourappurl.com/v1/sites/{"{site_id}"}
                    /galleries/{"{gallery_id}"}/images
                  </code>
                </pre>
              </li>
              <li>
                Include your API key in the request header:
                <pre className="bg-[#2323] p-4 rounded-md mt-2">
                  <code>x-api-key: YOUR_API_KEY</code>
                </pre>
              </li>
              <li>
                The response will include image data in JSON format:
                <pre className="bg-[#2323] p-4 rounded-md mt-2">
                  <code>
                    {`{
    "images": [
        {
            "id": "12345",
            "title": "Sunset",
            "description": "A beautiful sunset.",
            "url": "https://yourappurl.com/uploads/sunset.jpg"
        },
        ...
    ]
}`}
                  </code>
                </pre>
              </li>
              <li>
                Use this data to display images dynamically on your client’s
                website.
              </li>
            </ol>
          </section>
        </main>
      </div>
    </div>
  );
}
