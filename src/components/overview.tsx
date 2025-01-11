"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitBranch, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Overview({ prData }: { prData: any[] }) {
  const hasData = prData && prData.length > 0;

  if (!hasData) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-gray-800 p-6 size-24">
            <GitBranch className="h-12 w-12 text-gray-400" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">
            No data available
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            Connect a repository to start tracking pull requests
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Button variant="outline" className="mt-2 gap-2">
            <Plus className="h-4 w-4" />
            Connect Repository
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={prData}>
        <XAxis
          dataKey="_id"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          tickCount={3}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="count"
          fill="#adfa1d"
          radius={[16, 16, 0, 0]}
          className='fill-slate-800'
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
