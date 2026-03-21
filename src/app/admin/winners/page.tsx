import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WinnerActions from "@/components/winner/winner-actions";

export const dynamic = "force-dynamic";

export default async function WinnersPage() {
  const winners = await prisma.winner.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto min-h-screen mt-16 p-6">
      <h1 className="text-2xl font-semibold mb-6">Winners</h1>

      <div className="bg-white rounded-xl border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {winners.map((w) => (
              <TableRow key={w.id}>
                <TableCell className="font-medium">
                  {w.user.name || "N/A"}
                </TableCell>

                <TableCell>{w.user.email}</TableCell>

                <TableCell>₹{w.prizeAmount}</TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      w.status === "APPROVED"
                        ? "bg-green-100 text-green-600"
                        : w.status === "REJECTED"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {w.status}
                  </span>
                </TableCell>

                <TableCell className="text-right space-x-2 flex">
                  <WinnerActions id={w.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}