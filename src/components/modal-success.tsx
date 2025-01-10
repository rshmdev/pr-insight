import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";
import confetti from "canvas-confetti"; // Biblioteca para confetes
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { CreditCard } from "lucide-react";

export function ModalSuccess({
  open,
  onClose,
}: {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    if (open) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] text-center">
        <DialogHeader>
          <DialogTitle className="text-green-600">Parabéns!</DialogTitle>
          <DialogDescription>
            Sua assinatura foi realizada com sucesso! 🎉
          </DialogDescription>
        </DialogHeader>
        <p className="my-4 text-sm text-neutral-300">
          Agora você tem acesso completo aos benefícios do nosso plano.
          Aproveite todas as funcionalidades e recursos exclusivos.
        </p>
        <DialogFooter>
          <Button
            onClick={() => onClose(false)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
