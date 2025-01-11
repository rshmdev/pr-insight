"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  CheckCircle,
  Info,
  RefreshCw,
  AlertTriangle,
  XCircle,
  Check,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markAsRead } from "@/services/notifications";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

type NotificationType = "info" | "success" | "error" | "warning";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  date: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "info",
    message: "Nova atualização disponível",
    read: false,
    date: "2023-04-01",
  },
  {
    id: "2",
    type: "success",
    message: "Seu projeto foi aprovado",
    read: false,
    date: "2023-04-02",
  },
  {
    id: "3",
    type: "error",
    message: "Falha ao processar pagamento",
    read: false,
    date: "2023-04-03",
  },
  {
    id: "4",
    type: "warning",
    message: "Seu plano expira em 3 dias",
    read: false,
    date: "2023-04-04",
  },
];

export function ModalNotificacoes({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(session?.token || ""),
    enabled: isOpen && !!session?.token,
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({ id }: { id: string }) => markAsRead(session?.token, id),
    onSuccess: () => {
      refreshNotifications();
    },
    onError: () => {
      toast.error("Erro ao marcar notificação como lida");
    },
  });

  const refreshNotifications = () => {
    queryClient.invalidateQueries({
      queryKey: ["notifications"],
    });
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Notificações</DialogTitle>
            <Button onClick={refreshNotifications} variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {data?.length === 0 || !data ? (
            <p className="text-center text-gray-500">Nenhuma notificação.</p>
          ) : (
            data?.map((notif) => (
              <div
                key={notif.id}
                className={`mb-4 flex items-start space-x-4 rounded-lg p-3 transition-colors ${
                  notif.read ? "bg-gray-100" : "bg-white"
                }`}
              >
                {getIcon(notif.type)}
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      notif.read ? "text-gray-600" : "text-gray-900"
                    }`}
                  >
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-500">{notif.createdAt}</p>
                </div>
                {!notif.read && (
                  <Button
                    onClick={() => mutateAsync({ id: notif.id })}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
