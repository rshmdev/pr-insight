"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  GitBranch,
  GitPullRequest,
  LayoutDashboard,
  SettingsIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const logoVariants = {
  closed: { scale: 1 },
  open: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
};

const textVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Repositories",
      url: "/repos",
      icon: GitBranch,
    },
    {
      title: "Pull Requests",
      url: "/prs",
      icon: GitPullRequest,
    },
    {
      title: "AI config",
      url: "/ai",
      icon: SettingsIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useSession();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <motion.div
          className="flex items-center w-full justify-center gap-4"
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={logoVariants}
        >
          <AnimatePresence>
            {open && (
              <motion.h4
                initial="hidden"
                key="pr-insights"
                animate="visible"
                className="text-2xl font-bold"
                exit="exit"
                variants={textVariants}
              >
                PR Insights
              </motion.h4>
            )}
          </AnimatePresence>
        </motion.div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
