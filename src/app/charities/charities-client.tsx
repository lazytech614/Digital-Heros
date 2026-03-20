"use client";

type Charity = {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  isFeatured: boolean;
};

export default function CharitiesClient({
  charities,
}: {
  charities: Charity[];
}) {
  const handleSupport = async (charityId: string) => {
    const res = await fetch("/api/charity/support", {
      method: "POST",
      body: JSON.stringify({ charityId }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
    } else {
      alert("Charity added successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 mt-16">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">Charities</h1>
        <p className="text-gray-500 mt-2">
          Support meaningful causes by contributing to verified charities.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities.map((charity) => (
          <div
            key={charity.id}
            className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition"
          >
            {/* Image */}
            {charity.imageUrl ? (
              <img
                src={charity.imageUrl}
                alt={charity.name}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-lg">
                  {charity.name}
                </h2>

                {charity.isFeatured && (
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 line-clamp-3">
                {charity.description}
              </p>

              {/* Button */}
              <button
                onClick={() => handleSupport(charity.id)}
                className="mt-4 w-full bg-[#053C29] text-white py-2 rounded-lg font-medium hover:opacity-90"
              >
                Support This Charity
              </button>
            </div>
          </div>
        ))}

        {charities.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No charities available yet.
          </div>
        )}
      </div>
    </div>
  );
}