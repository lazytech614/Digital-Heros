export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen mt-16 px-6 py-12 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-6 text-gray-600">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6">
        At <span className="font-semibold">BirdieGive</span>, we value your
        privacy and are committed to protecting your personal data.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>Name and email address</li>
          <li>Account and authentication data</li>
          <li>Golf scores and activity data</li>
          <li>Payment and subscription details</li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Data</h2>
        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>To provide and improve our platform</li>
          <li>To process subscriptions and payments</li>
          <li>To manage prize draws and results</li>
          <li>To support charitable contributions</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Payments & Security</h2>
        <p className="text-gray-600">
          Payments are processed securely via third-party providers. We do not
          store your full payment details on our servers.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
        <p className="text-gray-600">
          We do not sell your personal data. We may share limited information with
          trusted services (such as payment providers) only as necessary to
          operate the platform.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Data Retention</h2>
        <p className="text-gray-600">
          We retain your data only as long as necessary to provide our services
          and comply with legal obligations.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>Access your data</li>
          <li>Request correction or deletion</li>
          <li>Withdraw consent</li>
        </ul>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Cookies</h2>
        <p className="text-gray-600">
          We use cookies to improve your experience and analyze usage of our
          platform.
        </p>
      </section>

      {/* Section 8 */}
      <section>
        <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
        <p className="text-gray-600">
          For any questions, contact us at{" "}
          <span className="font-medium">support@birdiegive.com</span>.
        </p>
      </section>
    </div>
  );
}