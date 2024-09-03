import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { User } from "@/lib/definations";
import { PhoneCall } from "lucide-react";
import ProfileAndName from "../chat-user-side/ProfileAndName";
import { MobileChatInfoSide } from "../chatInfoSide/mobileInfoSide/MobileChatInfoSide";
import { VideoDialog } from "../video-call/VideoDialog";

export function ChatAreaHeaderAndConnection({
  currentUser,
  isConnected,
  user,
}: {
  currentUser: User | null;
  isConnected?: boolean;
  user: User;
}) {
  return (
    <CardHeader className=" border-b-2">
      <div className="flex flex-wrap items-center justify-between">
        <ProfileAndName user={user} />
        <div className="flex items-center gap-2">
          <p className="text-green-400">{isConnected && "Online"}</p>
          <VideoDialog currentUser={currentUser} user={user} />
          <Button variant={"ghost"} size={"icon"}>
            <PhoneCall />
          </Button>
          <MobileChatInfoSide user={user} />
        </div>
      </div>
    </CardHeader>
  );
}
