"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function AccountUpdateModal({
  user,
  isOpen,
  setIsOpen,
}: {
  user?: User;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [avatar, setAvatar] = useState(user?.image);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the updated avatar to your backend
    console.log("Updated avatar:", avatar);
    setIsOpen(false);
  };

  console.log(user);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            Editar perfil
          </DialogTitle>
          <DialogDescription>
           Altere as informações do seu perfil
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar || ""} alt={user?.name || ''} />
                <AvatarFallback>{user?.name?.[0] || ''}</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="picture" className="text-right">
                 Avatar
                </Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" >
                Nome
              </Label>
              <Input
                id="name"
                value={user?.name || ""}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" >
                Email
              </Label>
              <Input
                id="email"
                value={user?.email || ""}
                className="col-span-3"
                disabled
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
                Salvar alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
