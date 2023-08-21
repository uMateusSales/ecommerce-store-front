"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";

import Currency from "@/components/ui/currency";

import useCart from "@/hooks/use-cart";

import { toast } from "react-hot-toast";
import Link from "next/link";

const Summary = () => {
  const cart = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("sucess")) {
      toast.success("Pagamento feito");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("alguma coisa deu errado");
    }
  }, [searchParams, removeAll]);

  const totalPrice = cart.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: cart.map((i) => i.id),
      }
    );
    window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-800">Detalhes do pedido</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-800">
            Total do pedido
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <Link
        target="_blank"
        href={`https://api.whatsapp.com/send?phone=5581986379256&text=######%20PEDIDO%20########%0A%0A%0AProdutos:%20%0A####################
        ${cart.map(
          (i) =>
            `%0A%0A######%0A%0A%20Nome%20do%20produto:%20${i.name}%0A%0AValor:%20R$${i.price},00%0A%0AQuantidade:%20${i.quantity}%0A%0A########`
        )}
        ###############################%0A%0A%0AValor%20total%20do%20pedido:%20R$${totalPrice},00%0A%0A######%20`}
      >
        <Button disabled={cart.length === 0} className="w-full mt-6">
          Finalizar pedido
        </Button>
      </Link>
    </div>
  );
};

export default Summary;
