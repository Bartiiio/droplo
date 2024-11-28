import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogWindowProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   title: string;
   description: string;
}

function DialogWindow({
   isOpen,
   onClose,
   onConfirm,
   title,
   description,
}: DialogWindowProps) {
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <Button variant="outline" onClick={onClose}>
                  Anuluj
               </Button>
               <Button variant="destructive" onClick={onConfirm}>
                  Usuń
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}

export default DialogWindow;
