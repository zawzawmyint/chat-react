import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarProfile({ className }: { className?: string }) {
  return (
    <Avatar className={`${className}`}>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="w-full hover:scale-110 transition-all duration-500"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
