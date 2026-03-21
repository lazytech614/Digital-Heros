export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}