import { useEffect, useState } from "react";
import { socket } from "@/socket";

export function useSocket(userId: string, currentUserId: string | undefined) {
  const [isConnected, setIsConnected] = useState(false);
  const [userMessages, setUserMessages] = useState<string[]>([]);

  function onMessageEvent({
    userId: id,
    senderId,
    msg,
  }: {
    userId: string;
    senderId: string;
    msg: string;
  }) {
    // Ensure that the message is either sent by the current user to the selected user,
    // or sent by the selected user to the current user
    if (
      (id === userId && senderId === currentUserId) ||
      (id === currentUserId && senderId === userId)
    ) {
      console.log(`${id}: ${msg}`);
      const message = senderId + "_" + msg;
      setUserMessages((previous) => [...previous, message]);
    }
  }

  const greetEvent = (msg: string) => {
    const message = userId + "_" + msg;
    setUserMessages((previous) => [...previous, message]);
  };

  function onConnect() {
    console.log("Connected to the server");
    setIsConnected(true);

    // Join room for the current user
    // if (currentUserId) {
    //   socket.emit("joinRoom", currentUserId);
    // }
  }

  function onDisconnect() {
    console.log("Disconnected from the server");
    setIsConnected(false);
  }

  useEffect(() => {
    if (!socket.connected) {
      console.log("Connecting socket...");
      socket.connect();
    } else {
      console.log("Socket already connected");
      setIsConnected(true);
      // if (currentUserId) {
      //   socket.emit("joinRoom", currentUserId);
      // }
    }

    console.log("Setting up socket listeners");
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("greet", greetEvent);
    socket.on("message", onMessageEvent);

    return () => {
      console.log("Cleaning up socket listeners");
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("greet", greetEvent);
      socket.off("message", onMessageEvent);
    };
  }, [userId, currentUserId]);

  useEffect(() => {
    setUserMessages([]); // Clear messages when switching users
  }, [userId, currentUserId]);

  return { isConnected, userMessages };
}
