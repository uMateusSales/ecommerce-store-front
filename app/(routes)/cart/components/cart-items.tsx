import Image from "next/image";

import { toast } from "react-hot-toast";
import { Minus, Plus, X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";

import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { MouseEventHandler, useState } from "react";

interface CartItemProps {
  data: Product;
}

const CartItems: React.FC<CartItemProps> = ({ data }) => {
 

  const cart = useCart();


  const [itemsInCart, setItemsInCart] = useState(data.quantity);
  const removeCart = () => {
    cart.removeItem(data.id);
  };

  const addToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
    setItemsInCart(data.quantity);
  };
  const removeFromCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.removeOneItem(data);
    setItemsInCart(data.quantity);
  };

  console.log(data);
  return (
    <li className="flex py-6 border-b">
      <div className=" relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          className="object-cover object-center"
          alt="cart item"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={removeCart} icon={<X size={20} />} />
        </div>
        <div className="relative pr-9 md:grid md:grid-cols-2 md:gap-x-6 md:pr-0">
          <div className="flex justify-between items-center ">
            <p className="text-lg font-semibold text-black">{data.name}</p>
        
          </div>
          <div className="mt-1 flex text-sm items-center">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
              {data.size.name}
            </p>
            <div className="flex justify-between items-center gap-2 ml-2 ">
            <IconButton onClick={removeFromCart} icon={<Minus size={15} />} />
            <p className="text-gray-500 ">
              {itemsInCart}
            </p>
            <IconButton
           
              onClick={addToCart}
              icon={<Plus size={15} />}
            />
          </div>
          </div>
          <Currency value={data.price} />
          
        </div>
      </div>
    </li>
  );
};

export default CartItems;
