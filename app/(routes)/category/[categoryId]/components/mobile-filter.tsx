"use client";

import { useState } from "react";
import { Color, Size } from "@/types";
import Button from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import IconButton from "@/components/ui/icon-button";
import Filter from "./filter";

interface FiltersMobileProps {
  sizes: Size[];
  colors: Color[];
}

const FiltersMobile: React.FC<FiltersMobileProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Filtros
        <Plus size={20} />
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-50 lg:hidden"
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 z-50 flex">
          <Dialog.Panel className="relative ml-auto flex h-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="items-center justify-end px-5">
              <IconButton icon={<X size={20} onClick={onClose} />} />
            </div>
            <div className="p-5">
              <Filter valueKey="sizeId" name="Tamanhos" data={sizes} />
              <Filter valueKey="colorId" name="Cores" data={colors} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default FiltersMobile;
