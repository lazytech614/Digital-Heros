export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Subscribe",
      desc: "Choose a monthly or yearly plan and pick the charity you want to support.",
      icon: "👤",
      bg: "bg-green-100 text-green-600",
    },
    {
      id: "02",
      title: "Enter Scores",
      desc: "Submit your last 5 Stableford scores — they become your draw numbers.",
      icon: "✏️",
      bg: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "03",
      title: "Win Prizes",
      desc: "Match 3, 4, or 5 numbers in the monthly draw to win from the prize pool.",
      icon: "🏆",
      bg: "bg-green-100 text-green-600",
    },
    {
      id: "04",
      title: "Give Back",
      desc: "A portion of every subscription goes directly to your chosen charity.",
      icon: "💛",
      bg: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-[#f5f5f3] text-center">
      
      <p className="text-yellow-500 tracking-widest text-sm mb-2">
        HOW IT WORKS
      </p>

      <h2 className="text-3xl md:text-5xl font-bold mb-16">
        Four Simple Steps
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center text-center">
            
            <div className="relative mb-6">
              <div className={`w-20 h-20 flex items-center justify-center rounded-2xl text-2xl ${step.bg}`}>
                {step.icon}
              </div>
              <span className="absolute -top-2 -right-4 text-gray-400 text-sm font-semibold">
                {step.id}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-3">
              {step.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}