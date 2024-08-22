import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/lib/definations";
import { cn } from "@/lib/utils";
import { BellDotIcon, Search, UserIcon } from "lucide-react";
import { AvatarProfile } from "../generic/avatar/ProfileAvatar";
import { Button } from "../ui/button";

export function ChatInfoSide({ user }: { user: User }) {
  return (
    <Card className={cn("w-full")}>
      <CardHeader>
        <div className="grid place-items-center space-y-3">
          <AvatarProfile className="w-20 h-20" />
          <div className="space-y-1 text-center">
            <CardTitle className="text-lg">{user?.username}</CardTitle>
            <CardDescription>{user?.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center space-x-2">
          <IconBtnAndText icon={<UserIcon />} text="Profile" />
          <IconBtnAndText icon={<BellDotIcon />} text="Mute" />
          <IconBtnAndText icon={<Search />} text="Search" />
        </div>
      </CardContent>
    </Card>
  );
}

const IconBtnAndText = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="grid place-items-center justify-center items-center">
      <Button size={"icon"} variant={"secondary"} className="rounded-full">
        {icon}
      </Button>
      <p className="text-xs">{text}</p>
    </div>
  );
};
