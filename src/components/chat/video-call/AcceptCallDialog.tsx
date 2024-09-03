import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AcceptCallDialog({
  dialogOpenAccept,
  setDialogOpenAccept,
  setIsAccept,
}: {
  dialogOpenAccept: boolean;
  setDialogOpenAccept: (open: boolean) => void;
  setIsAccept: (accept: boolean) => void;
}) {
  return (
    <AlertDialog
      open={dialogOpenAccept}
      onOpenChange={setDialogOpenAccept} // Keep the state in sync with the dialog's visibility
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Incoming Call</AlertDialogTitle>
          <AlertDialogDescription>
            You have an incoming video call. Do you want to accept it?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsAccept(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => setIsAccept(true)}>
            Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
