export default function TermsPage() {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto text-gray-800 mt-16 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-6 text-gray-600">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6">
        Welcome to <span className="font-semibold">BirdieGive</span>. By accessing
        or using our platform, you agree to be bound by these Terms of Service.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Use of the Platform</h2>
        <p className="text-gray-600">
          BirdieGive allows users to submit golf scores, participate in prize
          draws, and contribute to charitable causes. You agree to use the
          platform only for lawful purposes.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
        <p className="text-gray-600">
          You are responsible for maintaining the confidentiality of your
          account. Any activity under your account is your responsibility.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Subscriptions & Payments</h2>
        <p className="text-gray-600">
          Certain features require a paid subscription. Payments are processed
          securely through third-party providers. Subscription fees are
          non-refundable unless stated otherwise.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Prize Draws</h2>
        <p className="text-gray-600">
          Monthly draws are conducted based on submitted scores. BirdieGive
          reserves the right to verify scores and disqualify entries that violate
          rules.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Charity Contributions</h2>
        <p className="text-gray-600">
          A portion of user contributions is allocated to selected charities.
          While we strive for transparency, we do not guarantee specific outcomes
          from charitable donations.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Prohibited Activities</h2>
        <ul className="list-disc ml-6 text-gray-600 space-y-1">
          <li>Submitting false or manipulated scores</li>
          <li>Using the platform for illegal activities</li>
          <li>Attempting to exploit system vulnerabilities</li>
        </ul>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
        <p className="text-gray-600">
          We reserve the right to suspend or terminate accounts that violate
          these terms without prior notice.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Limitation of Liability</h2>
        <p className="text-gray-600">
          BirdieGive is not liable for any indirect, incidental, or consequential
          damages arising from your use of the platform.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
        <p className="text-gray-600">
          We may update these Terms from time to time. Continued use of the
          platform means you accept the revised terms.
        </p>
      </section>

      {/* Section 10 */}
      <section>
        <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions, please contact us at{" "}
          <span className="font-medium">support@birdiegive.com</span>.
        </p>
      </section>
    </div>
  );
}