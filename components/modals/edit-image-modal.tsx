"use client";

import { useEditImageModal } from "@/hooks/use-edit-image-modal";
import { Modal } from "@/components/ui/modal";
import { Card } from "../ui/card";
import Image from "next/image";
import EditImageForm from "../forms/edit-images-form";

export const EditImageModal = () => {
  const editImageModal = useEditImageModal();

  return (
    <Modal
      title="Image Preview"
      description="View, edit and remove images"
      isOpen={editImageModal.isOpen}
      onClose={editImageModal.onClose}
    >
      <div className="flex flex-col space-y-4">
        <EditImageForm image={editImageModal.image} />
      </div>
    </Modal>
  );
};
