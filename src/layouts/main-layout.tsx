"use client";

import { ModalSuccess } from "@/components/modal-success";
import Sidebar from "@/components/sidebar";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [suceess, setSuccess] = useState(false);

  const params = useSearchParams();

  useEffect(() => {
    if (params.get("success")) {
      setSuccess(true);
    }
  }, [params]);

  return (
    <>
      <section className="p-4 h-screen">
        <Sidebar />
      </section>

      <section className="flex flex-col gap-4 mt-8 overflow-y-auto flex-1">
        {children}

        <ModalSuccess open={suceess} onClose={setSuccess} />
      </section>
    </>
  );
}
