import { Card } from "@/components/ui/card";
import { useSocket } from "@/hooks/useSocket";
import { User } from "@/lib/definations";
import { ChatAreaHeaderAndConnection } from "./ChatAreaHeaderAndConnection";
import ChatAreaEvents from "./ChatAreaEvents";
import { ChatAreaForm } from "./ChatAreaForm";
import { cn } from "@/lib/utils";

export function ChatArea({
  user,
  currentUser,
}: {
  user: User;
  currentUser: User | null;
}) {
  const { isConnected, userMessages } = useSocket(
    user.id.toString(),
    currentUser?.id.toString()
  );

  return (
    <Card className={cn("sm:basis-3/5")}>
      <ChatAreaHeaderAndConnection
        currentUser={currentUser}
        user={user}
        isConnected={isConnected}
      />
      <ChatAreaEvents user={user} messageEvents={userMessages} />
      <ChatAreaForm user={user} currentUser={currentUser} />
    </Card>
  );
}
