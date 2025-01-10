import { api } from "@/lib/api";
import { GithubRepository, Repository } from "@/types";
import toast from "react-hot-toast";

export const getRepos = async (token: string) => {
  try {
    const response = await api.get("/repositories/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Repository[];
  } catch (error) {
    toast("Erro ao buscar repositórios", { icon: "❌" });
  }
};

export const getGithubRepos = async (token: string) => {
  try {
    const response = await api.get("/repositories/github", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as GithubRepository[];
  } catch (error) {
    toast("Erro ao buscar repositórios", { icon: "❌" });
  }
};

