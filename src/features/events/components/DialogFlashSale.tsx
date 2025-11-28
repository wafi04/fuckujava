import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormFlashSale } from "./FormFlashSale";
import type { FlashSale } from "../types";

interface DialogFlashSaleProps {
  open: boolean;
  onOpen: () => void;
  flashSale?: FlashSale;
}
export function DialogFlashSale({
  onOpen,
  open,
  flashSale,
}: DialogFlashSaleProps) {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Flash Sale</DialogTitle>
          <DialogDescription>Flash Sale</DialogDescription>
        </DialogHeader>
        <FormFlashSale flashSale={flashSale} />
      </DialogContent>
    </Dialog>
  );
}
