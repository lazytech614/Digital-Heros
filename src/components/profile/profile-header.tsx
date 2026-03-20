export default function ProfileHeader({ user }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
        {user.subscriptionStatus || "FREE"}
      </span>
    </div>
  );
}