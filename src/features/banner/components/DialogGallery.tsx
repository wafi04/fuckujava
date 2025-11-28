"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/features/upload/ImageUpload";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { UseCreateBanner, UseUpdateBanner } from "../api";

interface BannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  banner?: {
    id: number;
    url: string;
    types: string;
    isActive: boolean;
  } | null;
}

export function BannerDialog({
  open,
  onOpenChange,
  banner,
}: BannerDialogProps) {
  const [url, setUrl] = useState("");
  const [types, setTypes] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { mutate: createMutate, isPending: isCreating } = UseCreateBanner();
  const { mutate: updateMutate, isPending: isUpdating } = UseUpdateBanner();

  const isEdit = !!banner;
  const isPending = isCreating || isUpdating;

  // Reset form saat dialog dibuka/ditutup
  useEffect(() => {
    if (open && banner) {
      // Edit mode - isi form dengan data banner
      setUrl(banner.url);
      setTypes(banner.types);
      setIsActive(banner.isActive);
    } else if (open && !banner) {
      // Create mode - reset form
      setUrl("");
      setTypes("");
      setIsActive(true);
    }
  }, [open, banner]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      url,
      isActive,
      types: "banner",
    };

    if (isEdit) {
      updateMutate(
        { id: banner.id, ...payload },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    } else {
      // Create new banner
      createMutate(
        {
          types: payload.types,
          url: payload.url,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit Banner" : "Tambah Banner Baru"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Ubah informasi banner yang sudah ada"
                : "Isi form di bawah untuk menambahkan banner baru"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 justify-center items-center">
            {/* URL/Image Upload */}
            {!banner && (
              <div className="space-y-2 ">
                <Label htmlFor="url">
                  Banner Image <span className="text-destructive">*</span>
                </Label>
                <ImageUpload
                  onUrlChange={(newUrl) => setUrl(newUrl)}
                  currentUrl={url}
                  className="w-48 h-full border-2 border-dashed rounded-lg hover:border-primary/50 transition-colors"
                />
              </div>
            )}

            {/* Types */}

            {/* Is Active */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
              <div className="space-y-0.5">
                <Label htmlFor="isActive" className="text-base font-medium">
                  Status Banner
                </Label>
                <p className="text-sm text-muted-foreground">
                  {isActive
                    ? "Banner aktif dan akan ditampilkan"
                    : "Banner nonaktif dan tidak ditampilkan"}
                </p>
              </div>
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEdit ? "Menyimpan..." : "Menambahkan..."}
                </>
              ) : (
                <>{isEdit ? "Simpan Perubahan" : "Tambah Banner"}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
