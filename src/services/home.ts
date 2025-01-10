import { api } from "@/lib/api";
import toast from "react-hot-toast";

export const getHomeData = async (token: string) => {
  try {
    const res = await api.get("/home", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};
