import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { User } from "@/lib/definations";
import { VideoIcon } from "lucide-react";
import Peer, { MediaConnection } from "peerjs";
import { useEffect, useRef, useState } from "react";
import VideoCall from "./VideoCall";

interface VideoDialogProps {
  currentUser: User | null;
  user: User;
}

export function VideoDialog({ currentUser, user }: VideoDialogProps) {
  const [peerId, setPeerId] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerInstance = useRef<Peer | null>(null);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  // Inside your component:
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [pendingCall, setPendingCall] = useState<MediaConnection | null>(null);

  useEffect(() => {
    if (!currentUser?.id) return;

    const peer = new Peer(currentUser.id.toString());

    peer.on("open", (id) => {
      setPeerId(id);
    });

    // Listen for incoming calls
    peer.on("call", (call: MediaConnection) => {
      setPendingCall(call); // Store the incoming call
      setConfirmOpen(true); // Open the confirmation dialog
    });

    peerInstance.current = peer;

    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
      }
      setDialogOpen(false);
      setIsCallActive(false);
    };
  }, [currentUser?.id, user.id, peerId]);

  const handleAccept = () => {
    if (pendingCall) {
      setDialogOpen(true);
      setIsCallActive(true);
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          if (currentVideoRef.current) {
            currentVideoRef.current.srcObject = mediaStream;
            currentVideoRef.current.play();
          }
          pendingCall.answer(mediaStream);
          pendingCall.on("stream", (remoteStream: MediaStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            }
          });
        })
        .catch((err) => console.error("Failed to get media:", err));
    }
    setConfirmOpen(false);
  };

  const handleReject = () => {
    pendingCall?.close(); // Reject the call
    setConfirmOpen(false);
  };

  // Call to another user
  const callPeer = (remotePeerId: string) => {
    setIsCallActive(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        if (currentVideoRef.current) {
          currentVideoRef.current.srcObject = mediaStream;
          currentVideoRef.current.play();
        }

        const call = peerInstance.current?.call(remotePeerId, mediaStream);

        call?.on("stream", (remoteStream: MediaStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
      })
      .catch((err) => console.error("Failed to get media:", err));
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <VideoIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Video Call</DialogTitle>
            <DialogDescription>
              Video Call between {currentUser?.username} and {user.username}
            </DialogDescription>
          </DialogHeader>
          <VideoCall
            otherUser={user}
            callPeer={callPeer}
            // peerInstance={peerInstance}
            currentVideoRef={currentVideoRef}
            remoteVideoRef={remoteVideoRef}
            isCallActive={isCallActive}
            setIsCallActive={setIsCallActive}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Incoming Call</DialogTitle>
            <DialogDescription>
              {user.username} is calling. Do you want to accept?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleReject}>Reject</Button>
            <Button onClick={handleAccept} variant={"secondary"}>
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VideoDialog;
