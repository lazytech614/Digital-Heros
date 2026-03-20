import ProfileEditForm from "./profile-edit-form";

export default function ProfileDetails({ user }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Account Details</h2>

      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div>
          <p className="text-gray-500">Billing</p>
          <p>{user.billingInterval || "N/A"}</p>
        </div>

        <div>
          <p className="text-gray-500">Contribution %</p>
          <p>{user.contributionPct}%</p>
        </div>

        <div>
          <p className="text-gray-500">Subscription Ends</p>
          <p>
            {user.stripeCurrentPeriodEnd
              ? new Date(user.stripeCurrentPeriodEnd).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      <ProfileEditForm user={user} />
    </div>
  );
}