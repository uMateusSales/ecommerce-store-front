"use client";

import React from "react";

import Image from "next/image";
import { Tab } from "@headlessui/react";

import { Image as ImageType } from "@/types";
import GalleryTab from "./gallery-tab";

interface GalleryProps {
  images: ImageType[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2x1 sm:block">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((i) => (
            <GalleryTab key={i.id} image={i} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {images.map((i) => (
          <Tab.Panel key={i.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Image
                fill
                src={i.url}
                alt="image"
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
