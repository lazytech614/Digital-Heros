export default function DrawStats({ draws }: { draws: number }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold">Total Draws</h2>
      <p className="text-3xl font-bold mt-2">{draws}</p>
    </div>
  );
}