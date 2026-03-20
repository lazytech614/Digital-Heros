interface Props {
  total: number;
}

export default function TotalDisplay({ total }: Props) {
  const getPerformance = () => {
    if (total >= 36) return "🔥 Excellent";
    if (total >= 30) return "👍 Good";
    return "💪 Keep Going";
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-2xl shadow-md text-center">
      <h2 className="text-xl font-bold">{total} pts</h2>
      <p className="text-gray-600">{getPerformance()}</p>
    </div>
  );
}