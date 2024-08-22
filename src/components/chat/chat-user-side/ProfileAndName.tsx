import { AvatarProfile } from "@/components/generic/avatar/ProfileAvatar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/definations";

const ProfileAndName = ({ user }: { user?: User }) => {
  return (
    <div className="flex gap-2 items-center">
      <AvatarProfile />
      <div className="space-y-1">
        <CardTitle className="text-lg">{user?.username}</CardTitle>
        <CardDescription>{user?.description}</CardDescription>
      </div>
    </div>
  );
};

export default ProfileAndName;
