import {
 Dialog,
 DialogContent,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
 open: boolean;
 title?: string;
 description?: string;
 confirmText?: string;
 cancelText?: string;
 onOpenChange: (open: boolean) => void;
 onConfirm: () => void;
};

export default function ConfirmDialog({
 open,
 title = "Are you sure?",
 description,
 confirmText = "Delete",
 cancelText = "Cancel",
 onOpenChange,
 onConfirm,
}: ConfirmDialogProps) {
 return (
  <Dialog open={open} onOpenChange={onOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>{title}</DialogTitle>
     {description && <p className='text-gray-500 text-sm'>{description}</p>}
    </DialogHeader>
    <DialogFooter>
     <Button variant='outline' onClick={() => onOpenChange(false)}>
      {cancelText}
     </Button>
     <Button variant='destructive' onClick={onConfirm}>
      {confirmText}
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
