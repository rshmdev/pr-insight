import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentPRs() {
  return (
    <div className="space-y-8">
      {recentPRs.map((pr) => (
        <div
          key={pr.id}
          className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between p-4 border rounded-lg"
        >
          <div className="flex items-center w-full sm:w-auto">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src={pr.avatar} alt="Avatar" />
              <AvatarFallback>{pr.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <p className="text-sm font-medium leading-none">{pr.name}</p>
              <p className="text-sm text-muted-foreground">{pr.email}</p>
            </div>
          </div>
          <div className="mt-2 sm:mt-0 sm:ml-auto text-right">
            <p className="font-medium">{pr.prTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const recentPRs = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@example.com",
    prTitle: "Add user authentication",
    avatar: "/avatars/01.png",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@example.com",
    prTitle: "Implement dark mode",
    avatar: "/avatars/02.png",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@example.com",
    prTitle: "Optimize database queries",
    avatar: "/avatars/03.png",
  },
  {
    id: "4",
    name: "William Chen",
    email: "william.chen@example.com",
    prTitle: "Update API documentation",
    avatar: "/avatars/04.png",
  },
  {
    id: "5",
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@example.com",
    prTitle: "Fix responsive layout issues",
    avatar: "/avatars/05.png",
  },
];
