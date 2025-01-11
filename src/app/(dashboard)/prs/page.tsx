"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getPrs } from "@/services/prs";
import { ColumnDef } from "@tanstack/react-table";
import { PullRequest } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";

const columns: ColumnDef<PullRequest>[] = [
  { id: "name", header: "Nome", accessorKey: "title" },
  { id: "repo", header: "Repositorio", accessorKey: "repoName" },
  {
    id: "status",
    header: "Status",
    accessorKey: "state",
    cell: (row) => {
      return row.row.original.state === "open" ? (
        <Badge color="bg-green-500">Aberto</Badge>
      ) : (
        <Badge color="bg-red-500">Fechado</Badge>
      );
    },
  },
  {
    id: "createdAt",
    header: "Data de criação",
    accessorKey: "createdAt",
    cell: (row) => {
      return new Date(row.row.original.createdAt).toLocaleString();
    },
  },
  {
    id: "updatedAt",
    header: "Data de atualização ",
    accessorKey: "updatedAt",
    cell: (row) => {
      return new Date(row.row.original.updatedAt).toLocaleString();
    },
  },
];

export default function PullRequestsPage() {
  const { data: session } = useSession();
  const { data } = useQuery({
    queryKey: ["prs"],
    queryFn: () => getPrs(session?.token || ""),
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
          <h1 className="text-3xl font-bold">Historico de Pull Requests</h1>
        </div>
        <DataTable table={table} />
      </div>
    </Suspense>
  );
}
