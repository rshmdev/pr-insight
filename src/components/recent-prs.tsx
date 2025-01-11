import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GitPullRequest, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecentPRs({ lastPrs }: { lastPrs: any[] }) {
  if (!lastPrs || lastPrs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <div className="rounded-full bg-gray-800 p-6 size-24">
          <GitPullRequest className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">
          No recent pull requests
        </h3>
        <p className="text-sm text-gray-400">
          Connect a repository to start tracking pull requests
        </p>
        <Button variant="outline" className="mt-2 gap-2">
            <Plus className="h-4 w-4" />
            Connect Repository
          </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {lastPrs.map((pr) => (
        <div
          key={pr._id}
          className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between p-4 border rounded-lg"
        >
          <div className="flex items-center w-full sm:w-auto">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src={pr.avatar} alt="Avatar" />
              <AvatarFallback>{pr.userId.name}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <p className="text-sm font-medium leading-none">
                {pr.userId.name}
              </p>
              <p className="text-sm text-muted-foreground">{pr.userId.email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
