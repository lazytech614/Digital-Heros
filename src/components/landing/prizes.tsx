export default function Prizes() {
  const prizes = [
    {
      tag: "Jackpot",
      title: "5-Number Match",
      percent: "40%",
      note: "Rolls over if unclaimed",
      border: "border-yellow-500",
      tagStyle: "bg-yellow-400 text-black",
    },
    {
      tag: "Major",
      title: "4-Number Match",
      percent: "35%",
      note: "Split among winners",
      border: "border-green-400",
      tagStyle: "bg-green-600 text-white",
    },
    {
      tag: "Starter",
      title: "3-Number Match",
      percent: "25%",
      note: "Split among winners",
      border: "border-gray-300",
      tagStyle: "bg-gray-200 text-gray-600",
    },
  ];

  return (
    <section id="prizes" className="py-24 px-6 bg-[#efe6c9] text-center">
      
      <p className="text-orange-500 tracking-[0.2em] text-sm mb-4">
        MONTHLY DRAWS
      </p>

      <h2 className="text-3xl md:text-5xl font-bold text-[#1f1f1f] mb-6">
        Real Prizes, Every Month
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-sm md:text-lg leading-relaxed">
        Your golf scores become your draw numbers. Match them to the monthly draw
        and win from the growing prize pool.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {prizes.map((item, index) => (
          <div
            key={index}
            className={`bg-[#f6f1dc] border-2 ${item.border} rounded-2xl p-10 text-center`}
          >
            
            <div className="mb-6">
              <span className={`px-4 py-1 rounded-full text-sm font-medium ${item.tagStyle}`}>
                {item.tag}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-[#1f1f1f]">
              {item.title}
            </h3>

            <p className="text-4xl md:text-5xl font-bold text-[#1f1f1f] mb-2">
              {item.percent}
            </p>

            <p className="text-gray-500 mb-6">of Prize Pool</p>

            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              {index === 0 ? "↻" : "✦"} {item.note}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center gap-2 text-gray-600 text-sm">
        <span className="text-green-600">↗</span>
        <p>Prize pool grows with every new subscriber</p>
      </div>
    </section>
  );
}