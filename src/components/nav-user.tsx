"use client";

import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "next-auth/react";
import { ModalBilling } from "./modal-billing";
import { useState } from "react";
import { AccountUpdateModal } from "./account-update-modal";
import { PlanUpgradeModal } from "./modal-plan-upgrade";
import { ModalNotificacoes } from "./modal-notificacoes";

export function NavUser({
  user,
  sidebarOpen,
}: {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  sidebarOpen: boolean;
}) {
  const [billingOpen, setBillingOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <li className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-2">
            {!sidebarOpen ? (
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
            ) : (
              <>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.name || ""}
                  </span>
                  <span className="truncate text-xs">{user?.email || ""}</span>
                </div>
              </>
            )}

            <ChevronsUpDown className="ml-auto size-4" />
          </li>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.name || ""}
                </span>
                <span className="truncate text-xs">{user?.email || ""}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setUpgradeOpen(true)}>
              <Sparkles />
              Mudar de Plano
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setAccountOpen(true)}>
              <User2 />
              Conta
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setBillingOpen(true)}>
              <CreditCard />
              Pagamento
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setNotificationsOpen(true)}>
              <Bell />
              Notificações
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AccountUpdateModal
        isOpen={accountOpen}
        setIsOpen={setAccountOpen}
        user={user!}
      />
      <ModalBilling open={billingOpen} setOpen={setBillingOpen} />
      <PlanUpgradeModal
        planoAtual="Gratuito"
        isOpen={upgradeOpen}
        setIsOpen={setUpgradeOpen}
      />
      <ModalNotificacoes
        isOpen={notificationsOpen}
        setIsOpen={setNotificationsOpen}
      />
    </div>
  );
}
