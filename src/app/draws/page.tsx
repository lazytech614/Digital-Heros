import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import ProofUpload from "@/components/winner/upload-proof";

export default async function DrawsPage() {
  const { userId } = await auth();

  // 🔐 Get DB user
  let dbUser = null;

  if (userId) {
    dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
  }

  const draws = await prisma.draw.findMany({
    orderBy: [
      { year: "desc" },
      { month: "desc" },
    ],
    include: {
      winners: dbUser
        ? {
            where: {
              userId: dbUser.id, // 👈 only current user's wins
            },
          }
        : false,
    },
  });

  console.log(draws)

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <h1 className="text-3xl font-bold mb-6">Monthly Draws</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {draws.map((draw) => (
          <div
            key={draw.id}
            className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">
                {getMonthName(draw.month)} {draw.year}
              </h2>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  draw.isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {draw.isPublished ? "Published" : "Pending"}
              </span>
            </div>

            {/* Numbers */}
            <div className="flex gap-2 mb-4">
              {draw.numbers.map((num, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#053C29] text-white font-bold"
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Winners count */}
            <div className="text-sm text-gray-500 mb-2">
              Winners: {draw.winners?.length || 0}
            </div>

            {/* 🎯 USER WIN SECTION */}
            {draw.winners && draw.winners.length > 0 && (
              <div className="mt-4 p-3 border rounded-lg bg-gray-50">
                <p className="text-sm font-medium mb-2">
                  🎉 You won in this draw!
                </p>

                {draw.winners.map((winner) => (
                  <div key={winner.id}>
                    {/* Status */}
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        winner.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : winner.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : winner.status === "PAID"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {winner.status}
                    </span>

                    {/* Upload Proof */}
                    {winner.status === "PENDING" &&
                      !winner.proofUrl && (
                        <div className="mt-2">
                          <ProofUpload winnerId={winner.id} />
                        </div>
                      )}

                    {/* Show Proof */}
                    {winner.proofUrl && (
                      <img
                        src={winner.proofUrl}
                        alt="Proof"
                        className="mt-3 w-32 rounded-lg border"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Action */}
            <button className="mt-4 w-full bg-[#FFD700] text-black py-2 rounded-lg font-medium hover:opacity-90">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper
function getMonthName(month: number) {
  return new Date(0, month - 1).toLocaleString("default", {
    month: "long",
  });
}