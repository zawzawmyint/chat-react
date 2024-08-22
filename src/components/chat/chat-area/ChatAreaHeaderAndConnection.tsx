import { CardHeader } from "@/components/ui/card";
import ProfileAndName from "../chat-user-side/ProfileAndName";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, PhoneCall, VideoIcon } from "lucide-react";
import { User } from "@/lib/definations";

export function ChatAreaHeaderAndConnection({
  isConnected,
  user,
}: {
  isConnected: boolean;
  user: User;
}) {
  return (
    <CardHeader className=" border-b-2">
      <div className="flex flex-wrap items-center justify-between">
        <ProfileAndName user={user} />
        <div className="flex items-center gap-2">
          <p>{isConnected && "Online"}</p>
          <Button variant={"ghost"} size={"icon"}>
            <VideoIcon />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <PhoneCall />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <EllipsisVertical />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
}
