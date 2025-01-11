"use client";

import { DataTable } from "@/components/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getRepos } from "@/services/repos";
import { ConnectRepo } from "@/components/connect-repo";
import { Suspense } from "react";

const columns = [
  { id: "name", header: "Nome", accessorKey: "repoName" },
  { id: "prs", header: "PRs", accessorKey: "prCount" },
  { id: "owner", header: "Dono", accessorKey: "owner" },
  { id: "status", header: "Status", accessorKey: "status" },
];

export default function RepositoriesPage() {
  const { data: session } = useSession();

  const { data } = useQuery({
    queryKey: ["repositories"],
    queryFn: () => getRepos(session?.token || ""),
    enabled: !!session?.token,
  });

  const { table } = useDataTable({
    data: data || [],
    columns,
    pageCount: 1,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <Suspense>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Connected Repositories</h1>
          <ConnectRepo />
        </div>
        <DataTable table={table} />
      </div>
    </Suspense>
  );
}
