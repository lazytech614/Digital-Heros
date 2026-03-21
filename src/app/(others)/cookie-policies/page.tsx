export default function CookiesPage() {
  return (
    <div className="p-10 max-w-4xl mx-auto min-h-screen mt-16">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <p className="text-gray-700 mb-4">
        This Cookie Policy explains how we use cookies and similar technologies
        on our platform to enhance your experience, analyze usage, and improve
        our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">What Are Cookies?</h2>
      <p className="text-gray-700 mb-4">
        Cookies are small text files stored on your device by your browser when
        you visit a website. They help websites remember your preferences and
        improve your browsing experience.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Types of Cookies We Use</h2>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          <strong>Essential Cookies:</strong> Required for basic website functionality.
        </li>
        <li>
          <strong>Performance Cookies:</strong> Help us analyze how our website is
          used so we can improve performance.
        </li>
        <li>
          <strong>Functional Cookies:</strong> Remember your preferences and enhance
          your experience.
        </li>
        <li>
          <strong>Advertising Cookies:</strong> Used to deliver relevant ads
          and measure their effectiveness.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Managing Cookies</h2>
      <p className="text-gray-700 mb-4">
        You can control and manage cookies through your browser settings.
        Please note that disabling certain cookies may affect the functionality
        of our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">More Information</h2>
      <p className="text-gray-700 mb-4">
        If you have any questions about our use of cookies, please contact us at &nbsp;
        <a href="mailto:support@example.com" className="text-blue-600 underline">
          support@example.com
        </a>.
      </p>
    </div>
  );
}