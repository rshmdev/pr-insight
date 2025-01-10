import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/services/checkout";
import { useQuery } from "@tanstack/react-query";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { CreditCard } from "lucide-react";

export function ModalBilling({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { getBillingInfo } = useCheckout();

  const { data } = useQuery({
    queryKey: ["billingInfo"],
    queryFn: getBillingInfo,
    enabled: open,
  });

  console.log(data);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informações de Faturamento</DialogTitle>
        </DialogHeader>
        <div className="my-4 text-sm text-neutral-300">
          <p>
            <strong>Plano Atual:</strong> {data?.planName}
          </p>
          <p>
            <strong>Data de Expiração:</strong> {data?.expiryDate || "N/A"}
          </p>
          <p>
            <strong>Cartão:</strong>{" "}
            {data?.cardLast4
              ? `**** **** **** ${data?.cardLast4}`
              : "Não disponível"}
          </p>
        </div>
        <DialogFooter>
          {data?.cardLast4 && (
            <Button className="bg-green-600 hover:bg-green-700">
              Atualizar Cartão
            </Button>
          )}

          {data?.planName !== "Gratuito" && (
            <Button variant="destructive" className="ml-2">
              Cancelar Assinatura
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
            className="ml-2"
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
