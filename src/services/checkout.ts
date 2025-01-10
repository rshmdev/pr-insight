import { api } from "@/lib/api";
import { loadStripe } from "@stripe/stripe-js";
import { signIn, useSession } from "next-auth/react";

export const useCheckout = () => {
  const stripePromise = loadStripe(
    "pk_live_51OoEkyLZpQHeI3zggRX5iD4UxSQawiENS8w4Y0SpYX2j9CinyCvB9IgU0sfiP6X9xnmmHzBO1o7eqFHHTp8e0bor00zV73G6y4"
  ); // Sua chave pública

  const { data: session } = useSession();

  async function iniciarCheckout(plan?: string) {
    if (!session) {
      signIn("github", { callbackUrl: window.location.href + `?plan=${plan}` });
      return;
    }

    // Se o usuário estiver logado, prossegue com o checkout
    const response = await api.post(
      "/stripe/create-checkout-session",
      {
        priceId: plan,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );
    const { sessionId } = await response.data;
    const stripe = await stripePromise;

    if (!stripe) {
      return;
    }
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error(error);
    }
  }

  async function getBillingInfo() {
    if (!session) {
      return;
    }

    const response = await api.get("/stripe/billing-info", {
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    });

    return response.data;
  }

  return { iniciarCheckout, getBillingInfo };
};
