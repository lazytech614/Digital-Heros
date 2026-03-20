"use client"

export default function Pricing() {
  const handleSubscribe = async(priceId: string) => {
    if(!priceId) return

    try{
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({priceId})
      })

      const {url} = await response.json()

      if(url) window.location.href = url
      else throw new Error('No checkout url')
    }catch(err){
      console.log("Error during checkout", err)
      alert("Error during checkout")
    }
  }

  return (
    <section id="pricing" className="py-24 px-6 bg-[#f5f5f3] text-center">
      
      <p className="text-orange-500 tracking-[0.2em] text-sm mb-4">
        PRICING
      </p>

      <h2 className="text-3xl md:text-5xl font-bold text-[#1f1f1f] mb-6">
        Simple, Transparent Plans
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-sm md:text-lg">
        Every plan includes draw entry, score tracking, and charity giving. No hidden fees.
      </p>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-10 text-left">
          <h3 className="text-xl font-semibold mb-6">Monthly</h3>

          <div className="mb-6">
            <span className="text-4xl font-bold">£9.99</span>
            <span className="text-gray-500">/month</span>
          </div>

          <ul className="space-y-4 text-gray-600 mb-8">
            <li>✔ Enter monthly prize draws</li>
            <li>✔ Submit & track golf scores</li>
            <li>✔ Choose your charity</li>
            <li>✔ Full dashboard access</li>
            <li>✔ Winner verification support</li>
          </ul>

          <button onClick={() => handleSubscribe("monthly")} className="w-full bg-[#0b4a34] text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
            Subscribe →
          </button>
        </div>

        <div className="relative bg-white border-2 border-orange-400 rounded-2xl p-10 text-left shadow-md">
          
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="bg-orange-400 text-black px-4 py-1 rounded-full text-sm font-medium">
              Best Value
            </span>
          </div>

          <h3 className="text-xl font-semibold mb-6">Yearly</h3>

          <div className="mb-6">
            <span className="text-4xl font-bold">£89.99</span>
            <span className="text-gray-500">/year</span>
          </div>

          <ul className="space-y-4 text-gray-600 mb-8">
            <li>✔ Everything in Monthly</li>
            <li>✔ Save over 25%</li>
            <li>✔ Priority draw entry</li>
            <li>✔ Exclusive yearly prize pool</li>
            <li>✔ Early access to new features</li>
          </ul>

          <button onClick={() => handleSubscribe("yearly")} className="w-full bg-orange-400 text-black py-3 rounded-xl font-medium hover:opacity-90 transition">
            Subscribe →
          </button>
        </div>

      </div>
    </section>
  );
}