import { AvatarProfile } from "@/components/generic/avatar/ProfileAvatar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/definations";

type ProfileAndTextProps = {
  user: User;
  selectedUser: User;
  setSelectedUser: (user: User) => void;
};
const ProfileAndText = ({
  user,
  selectedUser,
  setSelectedUser,
}: ProfileAndTextProps) => {
  return (
    <div
      className={`flex gap-2 items-center cursor-pointer hover:shadow-md mb-1 rounded-md p-1 ${
        selectedUser.username === user.username && "bg-rose-50"
      }`}
      onClick={() => setSelectedUser(user)}
    >
      <AvatarProfile />
      <div className="space-y-1 hidden sm:block">
        <CardTitle className="text-lg">{user.username}</CardTitle>
        <CardDescription>{user.description}</CardDescription>
      </div>
    </div>
  );
};

export default ProfileAndText;
