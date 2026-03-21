export default function ContactPage() {
  return (
    <div className="p-10 max-w-4xl mx-auto min-h-screen mt-16">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="text-gray-700 mb-6">
        We'd love to hear from you! Please fill out the form below, and we'll get
        back to you as soon as possible.
      </p>

      <form className="space-y-4 max-w-md">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-1 font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 mb-1 font-medium">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Your Message"
            rows={5}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 max-w-md text-gray-700">
        <h2 className="text-xl font-semibold mb-2">Other Ways to Reach Us</h2>
        <p>Email: <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a></p>
        <p>Phone: <a href="tel:+1234567890" className="text-blue-600 underline">+1 234 567 890</a></p>
        <p>Address: 123 Main Street, City, Country</p>
      </div>
    </div>
  );
}