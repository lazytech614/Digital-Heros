export default function Charity() {
  return (
    <section id="charity" className="bg-[#0b4a34] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <p className="text-yellow-400 tracking-[0.2em] text-sm mb-4">
            CHARITY IMPACT
          </p>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Every Swing{" "}
            <span className="text-yellow-400">Gives Back</span>
          </h2>

          <p className="text-gray-300 max-w-xl mb-10 leading-relaxed">
            This isn't just about prizes. A meaningful portion of every subscription is
            donated to charity. You decide where it goes.
          </p>

          <div className="space-y-8">
            
            <div className="flex gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1f6b4a]">
                💛
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">You Choose</h4>
                <p className="text-gray-300 text-sm max-w-md">
                  Pick a charity at signup. At least 10% of your subscription goes directly to them.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1f6b4a]">
                🔍
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Charity Directory</h4>
                <p className="text-gray-300 text-sm max-w-md">
                  Browse, search and filter charities. View profiles, images, and upcoming events.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1f6b4a]">
                📅
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Events & Golf Days</h4>
                <p className="text-gray-300 text-sm max-w-md">
                  Charities can list upcoming golf days and events — connecting you to causes in person.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-[#155c3d] to-[#1f6b4a] rounded-3xl p-16 flex flex-col items-center justify-center text-center border border-white/10">
            
            <div className="w-20 h-20 rounded-full bg-[#2e7d57] flex items-center justify-center mb-6">
              <span className="text-yellow-400 text-2xl">💛</span>
            </div>

            <h3 className="text-5xl font-bold text-yellow-400 mb-4">
              £50K+
            </h3>

            <p className="text-gray-300">
              donated to charities and counting
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}