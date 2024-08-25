import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/definations";
import { EllipsisVertical } from "lucide-react";
import { ChatInfoSide } from "../ChatInfoSide";

export function MobileChatInfoSide({ user }: { user: User }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="sm:hidden">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <ChatInfoSide user={user} />
      </PopoverContent>
    </Popover>
  );
}
