'use client'

import { ModalSuccess } from "@/components/modal-success";
import { AppSidebar } from "@/components/sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const [suceess, setSuccess] = useState(true);



  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col overflow-y-auto relative">
        <header className="flex h-16 shrink-0 w-full items-center gap-2 border-b px-4 fixed top-0 z-50 bg-sidebar py-1">
          <SidebarTrigger className="-ml-1" />
          {/* <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </header>
        <div className="flex flex-col gap-4 mt-8 overflow-y-auto">
          {children}

          <ModalSuccess open={suceess} onClose={setSuccess} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
