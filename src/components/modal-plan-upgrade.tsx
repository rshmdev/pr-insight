"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, Zap } from 'lucide-react'

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  stripePriceId?: string;
}

const pricingPlans: PricingCardProps[] = [
  {
    name: "Gratuito",
    price: "R$ 0",
    features: ["Até 50 PRs/mês", "1 repositório", "Suporte por email"],
  },
  {
    name: "Pro",
    price: "R$ 49/mês",
    features: [
      "PRs ilimitados",
      "Até 10 repositórios",
      "Suporte prioritário",
      "Personalização avançada",
    ],
    highlighted: true,
    stripePriceId: "price_1OovvoLZpQHeI3zgWv49IkYn",
  },
  {
    name: "Empresarial",
    price: "R$ 199/mês",
    features: [
      "PRs ilimitados",
      "Repositórios ilimitados",
      "Suporte 24/7",
      "API dedicada",
      "Treinamento personalizado", 
    ],
    stripePriceId: "price_1OovxELZpQHeI3zg2y2gZbyz",
  },
];

export function PlanUpgradeModal({ planoAtual, isOpen, setIsOpen }: { planoAtual: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const [planoSelecionado, setPlanoSelecionado] = useState<string>(planoAtual)

  const handleUpgrade = () => {
    // Aqui você normalmente enviaria a solicitação de upgrade para o backend
    console.log("Fazendo upgrade para:", planoSelecionado)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>

      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Faça Upgrade do Seu Plano</DialogTitle>
          <DialogDescription>
            Escolha o plano que melhor atende às suas necessidades. Faça upgrade a qualquer momento para obter mais recursos.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup value={planoSelecionado} onValueChange={setPlanoSelecionado}>
          {pricingPlans.map((plano) => (
            <div key={plano.name} className="flex items-center space-x-2 space-y-4">
              <RadioGroupItem value={plano.name} id={plano.name} />
              <Label
                htmlFor={plano.name}
                className="flex flex-col space-y-1 cursor-pointer w-full"
              >
                <span className="font-semibold flex items-center">
                  {plano.name}
                  {plano.highlighted && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Popular
                    </span>
                  )}
                </span>
                <span className="text-sm text-gray-500">{plano.price}</span>
                <ul className="mt-2 space-y-1">
                  {plano.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Label>
            </div>
          ))}
        </RadioGroup>
        <DialogFooter>
          <Button onClick={handleUpgrade} disabled={planoSelecionado === planoAtual}>
            <Zap className="mr-2 h-4 w-4" />
            {planoSelecionado === planoAtual ? "Plano Atual" : "Fazer Upgrade Agora"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

