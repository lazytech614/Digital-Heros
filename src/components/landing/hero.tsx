export default function Hero() {
  return (
    <section
      id="hero" 
      className="relative min-h-screen flex items-center bg-cover bg-no-repeat text-white overflow-hidden px-6" 
      style={{background: "url(/hero-bg.jpg)"}}
    >

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
          <span>💛</span>
          <p className="text-sm">Play. Win. Give Back.</p>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Your Golf Scores{" "}
          <span className="text-yellow-400">Power Change</span>
        </h1>

        <p className="text-gray-300 max-w-xl mb-8 text-sm md:text-lg">
          Subscribe, submit your scores, and enter monthly prize draws —
          while a portion of every subscription goes directly to the charity you choose.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition">
            Get Started →
          </button>

          <button className="border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition">
            See How It Works
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-8">
          
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-3 rounded-full">🏆</div>
            <div>
              <p className="font-bold text-lg">£10K+</p>
              <p className="text-gray-400 text-sm">Monthly Prizes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-3 rounded-full">💛</div>
            <div>
              <p className="font-bold text-lg">£50K+</p>
              <p className="text-gray-400 text-sm">Donated to Charity</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}