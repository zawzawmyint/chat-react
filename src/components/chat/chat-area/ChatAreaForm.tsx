import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/definations";
import { socket } from "@/socket";
import { SendIcon } from "lucide-react";
import { useState } from "react";

export function ChatAreaForm({
  user,
  currentUser,
}: {
  user: User;
  currentUser: User | null;
}) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    const messageData = {
      userId: user.id, // The recipient of the message
      senderId: currentUser?.id, // The sender of the message
      msg: value,
    };

    socket.timeout(5000).emit("message", messageData, (err: Error) => {
      if (err) {
        console.error("Failed to send message:", err);
        // Optionally display error to the user
      }
      setValue("");
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <CardFooter className="w-full">
        <div className="flex items-center gap-1 w-full ">
          <Input
            type="text"
            placeholder="Aa"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button size={"icon"} type="submit" disabled={isLoading || !value}>
            <SendIcon />
          </Button>
        </div>
      </CardFooter>
    </form>
  );
}
