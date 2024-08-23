import { ScrollAreaBox } from "@/components/generic/scroll-area/ScrollAreaBox";
import { CardContent } from "@/components/ui/card";
import { User } from "@/lib/definations";

const ChatAreaEvents = ({
  messageEvents,
  user,
}: {
  messageEvents: string[];
  user: User;
}) => {
  console.log(messageEvents);
  return (
    <CardContent className="">
      <ScrollAreaBox className="h-[420px]">
        {messageEvents.map((message, i) => (
          <div
            className={` ${
              !message.startsWith(user.id.toString()) && " flex justify-end"
            }`}
          >
            <p
              key={i}
              className={`w-1/2 border-2 p-2 mt-2 overflow-auto rounded-md bg-primary ${
                message.startsWith(user.id.toString()) && "bg-secondary "
              }`}
            >
              <p
                className={` ${
                  !message.startsWith(user.id.toString()) && " flex justify-end"
                }`}
              >
                {message.split("_").at(1)}
              </p>
            </p>
          </div>
        ))}
      </ScrollAreaBox>
    </CardContent>
  );
};

export default ChatAreaEvents;
