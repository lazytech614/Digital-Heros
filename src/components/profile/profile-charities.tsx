export default function ProfileCharities({ charities }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Your Charities</h2>

      {charities.length === 0 ? (
        <p className="text-gray-500">No charities selected</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {charities.map((c: any) => (
            <div key={c.id} className="border p-4 rounded-lg">
              <h3 className="font-medium">{c.name}</h3>
              <p className="text-sm text-gray-500">{c.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}