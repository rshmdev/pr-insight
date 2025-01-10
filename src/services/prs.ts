import { api } from "@/lib/api";
import { PullRequest } from "@/types";
import toast from "react-hot-toast";

export const getPrs = async (token: string) => {
  try {
    const res = await api.get("/pr", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data as PullRequest[];
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};
