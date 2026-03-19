export default function HowItWorks() {
  return (
    <section id="how" className="py-20 px-6 text-center">
      <h2 className="text-2xl font-semibold mb-8">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="p-4 border rounded-lg">
          🎯 Pick 5 numbers (1–45)
        </div>

        <div className="p-4 border rounded-lg">
          🎲 Monthly draw happens
        </div>

        <div className="p-4 border rounded-lg">
          💰 Win prizes + support charity
        </div>
      </div>
    </section>
  );
}