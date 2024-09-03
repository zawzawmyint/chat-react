import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { User } from "@/lib/definations";
import { forwardRef, MutableRefObject } from "react";

interface VideoCallProps {
  otherUser: User;
  callPeer: (remotePeerId: string) => void;
  // peerInstance: MutableRefObject<Peer | null>;
  currentVideoRef: MutableRefObject<HTMLVideoElement | null>;
  remoteVideoRef: MutableRefObject<HTMLVideoElement | null>;
  isCallActive: boolean;
  setIsCallActive: (value: boolean) => void;
}

const VideoCall = forwardRef<HTMLDivElement, VideoCallProps>(
  (
    {
      otherUser,
      callPeer,
      currentVideoRef,
      remoteVideoRef,
      isCallActive,
      setIsCallActive,
    },
    ref
  ) => {
    const startCall = () => {
      callPeer(otherUser.id.toString());
      // Disable the call button after call starts
    };

    const endCall = () => {
      // Stop all media tracks of the local video stream
      if (currentVideoRef.current?.srcObject) {
        const localMediaStream = currentVideoRef.current
          .srcObject as MediaStream;
        localMediaStream.getTracks().forEach((track) => track.stop());
      }

      // Stop all media tracks of the remote video stream
      if (remoteVideoRef.current?.srcObject) {
        const remoteMediaStream = remoteVideoRef.current
          .srcObject as MediaStream;
        remoteMediaStream.getTracks().forEach((track) => track.stop());
      }

      // Destroy the peer instance
      // peerInstance.current?.destroy();
      setIsCallActive(false);
    };

    return (
      <div className="space-y-5 relative" ref={ref}>
        <div>
          <video className="rounded-md w-full" ref={remoteVideoRef} />
        </div>
        <div className="absolute top-0 right-5">
          <video className="max-h-20 rounded-md" ref={currentVideoRef} muted />
        </div>
        <div className="space-x-5">
          <Button
            variant={"secondary"}
            onClick={startCall}
            disabled={isCallActive} // Disable the button when the call is active
          >
            Call {otherUser.username}
          </Button>
          <DialogClose asChild>
            <Button
              variant={"default"}
              onClick={endCall}
              disabled={!isCallActive}
            >
              End
            </Button>
          </DialogClose>
        </div>
      </div>
    );
  }
);

export default VideoCall;
