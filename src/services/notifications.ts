import { api } from "@/lib/api";
import { INotification } from "@/types";
import toast from "react-hot-toast";

export const getNotifications = async (token: string) => {
  try {
    const response = await api.get("/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as INotification[];
  } catch (error) {
    toast.error("Erro ao buscar notificações");
  }
};

export const markAsRead = async (token?: string, id?: string) => {
  try {
    await api.post(
      `/notifications/mark-read`,
      id
        ? {
            notificationId: id,
          }
        : undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Erro ao marcar notificação como lida");
  }
};
