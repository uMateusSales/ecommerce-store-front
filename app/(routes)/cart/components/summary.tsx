"use client";

import axios from "axios";
import { use, useCallback, useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";

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


 

const getTotaPrice = useCallback(() => {return cart.reduce((total, item) => {
  return total + Number(item.price) * item.quantity;
 

}, 0)},[cart]  )



  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-800">Detalhes do pedido</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-800">
            Total do pedido
          </div>
          <Currency value={getTotaPrice()} />
        </div>
      </div>
    
      <Link target="_blank" href={`https://api.whatsapp.com/send?phone=5581986378256&text=Oi!%0A%0AFiz%20um%20pedido%20de%20${cart.map((i) => i.name )}%20por%20R$${getTotaPrice()}%20e%20queria%20saber%20a%20disponibilidade!`} >
      <Button disabled={cart.length === 0}  className="w-full mt-6">
        Finalizar pedido
      </Button>
      </Link>
    </div>
  );
};

export default Summary;
