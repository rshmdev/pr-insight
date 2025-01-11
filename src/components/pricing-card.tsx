import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/services/checkout";

export interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  className?: string;
  stripePriceId?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  features,
  highlighted = false,
  stripePriceId,
  className,
}) => {
  const [isPending, startTransaction] = useTransition();

  const { iniciarCheckout } = useCheckout();
  const router = useRouter();

  return (
    <Card
      className={cn(
        "bg-gray-800 border-gray-700 h-full transition-all duration-300 hover:scale-105 flex flex-col",
        highlighted
          ? "border-blue-500 border-2 shadow-lg shadow-blue-500/20"
          : "",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-2xl text-neutral-100">{name}</CardTitle>
        <CardDescription className="text-3xl font-bold text-neutral-100">
          {price}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-neutral-200">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">
        {stripePriceId ? (
          <Button
            onClick={() => {
              iniciarCheckout(stripePriceId);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Escolher Plano
          </Button>
        ) : (
          <Button
            disabled={isPending}
            onClick={() => {
              startTransaction(() => {
                router.push("/login");
              });
            }}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Entre ou Cadastre-se
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
