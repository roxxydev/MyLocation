import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

export type MessageAlertProps = {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  message: string | React.ReactNode;
  btnPositiveTxt: string;
  btnNegativeTxt?: string;
  btnPositiveAction?: () => void;
  btnNegativeAction?: () => void;
};

export const MessageAlert = ({
  isOpen,
  onClose,
  title,
  message,
  btnPositiveTxt,
  btnNegativeTxt,
  btnPositiveAction,
  btnNegativeAction,
}: MessageAlertProps) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="md">
            {title}
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          {typeof message === "string" ? (
            <Text size="sm">{message}</Text>
          ) : (
            message
          )}
        </AlertDialogBody>
        <AlertDialogFooter className="">
          {btnNegativeTxt && (
            <Button
              variant="outline"
              action="secondary"
              onPress={btnNegativeAction}
              size="sm"
            >
              <ButtonText>{btnNegativeTxt}</ButtonText>
            </Button>
          )}
          <Button size="sm" onPress={btnPositiveAction}>
            <ButtonText>{btnPositiveTxt}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
