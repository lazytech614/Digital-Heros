import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="px-6 min-h-screen mt-16 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Help Centre</h1>

      <p className="text-gray-600 mb-10">
        Need help with BirdieGive? Find answers and guides below.
      </p>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-xl border hover:shadow transition">
          <h2 className="font-semibold mb-2">Getting Started</h2>
          <p className="text-sm text-gray-600">
            Learn how to create an account and start playing.
          </p>
        </div>

        <div className="p-6 rounded-xl border hover:shadow transition">
          <h2 className="font-semibold mb-2">Subscriptions</h2>
          <p className="text-sm text-gray-600">
            Manage your plans, billing, and payments.
          </p>
        </div>

        <div className="p-6 rounded-xl border hover:shadow transition">
          <h2 className="font-semibold mb-2">Draws & Prizes</h2>
          <p className="text-sm text-gray-600">
            Understand how monthly draws and winnings work.
          </p>
        </div>
      </div>

      {/* Guides */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Popular Guides</h2>

        <ul className="space-y-3 text-gray-700">
          <li>• How to submit your golf score</li>
          <li>• How prize draws are calculated</li>
          <li>• How charity contributions work</li>
          <li>• How to update your profile</li>
        </ul>
      </div>

      {/* FAQ Link */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>

        <Link
          href="/faq"
          className="inline-block bg-black text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
        >
          Visit FAQs
        </Link>
      </div>

      {/* Contact */}
      <div className="bg-gray-100 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Contact Support</h2>

        <p className="text-gray-600 mb-4">
          Can’t find what you’re looking for? Reach out to us directly.
        </p>

        <Link
          href="/contact"
          className="text-blue-600 font-medium hover:underline"
        >
          Contact Us →
        </Link>
      </div>
    </div>
  );
}