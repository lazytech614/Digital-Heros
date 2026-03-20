export default function ProfileScores({ scores }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Recent Scores</h2>

      <div className="flex gap-2 flex-wrap">
        {scores.map((s: any) => (
          <div
            key={s.id}
            className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
          >
            {s.value} pts
          </div>
        ))}
      </div>
    </div>
  );
}