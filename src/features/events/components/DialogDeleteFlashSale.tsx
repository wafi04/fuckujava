import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteflashsale } from "../api/api";
import { Button } from "@/components/ui/button";

interface DialogDeleteProps {
  open: boolean;
  onOpen: () => void;
  Id?: number;
}
export function DialogDelete({ open, onOpen, Id }: DialogDeleteProps) {
  const { mutate } = useDeleteflashsale();
  const handleDelete = () => {
    mutate(Id as number);
    onOpen();
  };

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Voucher</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus voucher ini? Tindakan ini tidak
            dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onOpen}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
