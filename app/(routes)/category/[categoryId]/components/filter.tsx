"use client";

import qs from "query-string";

import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const handleClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((i) => (
          <div className="flex items-center" key={i.id}>
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border-gray-300",
                selectedValue === i.id && "bg-black text-white"
              )}
              onClick={() => handleClick(i.id)}
            >
              {i.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
