"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal-store";

/**
 * Modal used for users to view an image.
 */

function ViewImageModal() {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "viewImage";
  const { fileUrl } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="px-2 flex items-center justify-center">
          <div className="relative aspect-square overflow-auto rounded-md flex items-center justify-center bg-white w-full">
            <Image
              src={fileUrl as string}
              alt={"image"}
              fill
              className="object-contain"
            />
          </div>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6">
          <div className="py-1 flex items-center justify-center w-full">
            <Button variant="ghost">
              <a href={fileUrl} target="_blank">
                Open in browser
              </a>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ViewImageModal;
