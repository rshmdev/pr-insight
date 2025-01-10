import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export function ConnectRepo() {
  const { data: session } = useSession();
  const [search, setSearch] = useState(""); // se ainda precisar de busca para outros usos
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const res = await api.post(
        "/repositories/connect",
        {},
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );
      const { installationUrl } = res.data;
      // Redireciona o usuário para a URL de instalação do GitHub App
      window.location.href = installationUrl;
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Erro ao iniciar conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Conectar novo repositório</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[80dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Conecte um novo repositório</DialogTitle>
          <DialogDescription>
            Ao prosseguir, você será direcionado para instalar o app "PR Insight Bot" no GitHub. 
            Após a instalação, os repositórios selecionados serão sincronizados automaticamente.
          </DialogDescription>
        </DialogHeader>
        {/* Se não precisar mais do campo de busca ou listagem, remova-os */}
        <Button
          onClick={handleConnect}
          disabled={loading}
          className="mt-4"
        >
          {loading ? "Redirecionando..." : "Instalar PR Insight Bot"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
