import { ScrollAreaBox } from "@/components/generic/scroll-area/ScrollAreaBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/lib/definations";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import ProfileAndName from "./ProfileAndName";
import ProfileAndText from "./ProfileAndText";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type ChatUserSideProps = {
  users: User[];
  currentUser: User | null;
  selectedUser: User;
  setSelectedUser: (user: User) => void;
};

export function ChatUserSide({
  users,
  currentUser,
  selectedUser,
  setSelectedUser,
}: ChatUserSideProps) {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  return (
    <Card className={cn("sm:basis-1/5")}>
      <CardHeader className="space-y-5">
        <div className="flex items-center justify-between ">
          {currentUser ? (
            <ProfileAndName user={currentUser} />
          ) : (
            <div className="text-red-500">Current user not found</div>
          )}
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setIsSearch(!isSearch)}
          >
            <SearchIcon />
          </Button>
        </div>
        {isSearch && (
          <div>
            <Input
              type="search"
              placeholder="Search friends..."
              className="focus:scale-105"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="grid gap-4">
        <Tabs defaultValue="inbox" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="group">Group</TabsTrigger>
          </TabsList>
          <TabsContent value="inbox">
            <ScrollAreaBox>
              <div className="flex sm:flex-col">
                {users.map((user, i) => (
                  <ProfileAndText
                    key={user.id ?? i} // Use user.id if available
                    user={user}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                  />
                ))}
              </div>
            </ScrollAreaBox>
          </TabsContent>
          <TabsContent value="group">{/* Future group content */}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
