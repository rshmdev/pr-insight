"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX, useState } from "react";
import { cn } from "../lib/utils";
import {
  Archive,
  AudioWaveformIcon,
  BrainCircuit,
  ChevronDown,
  GitPullRequest,
  Home,
  LayoutDashboard,
  PaintBucket,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";

type TOption = {
  label: string;
  href: string;
  icon: JSX.Element;

  type?: "item";
};

type TSidebar = {
  label: string;
  icon: JSX.Element;
  items: TOption[];

  type: "submenu";
};

type TDivider = {
  type: "divider";
};

export default function Sidebar() {
  const pathname = usePathname();

  const { data: user } = useSession();
  const [isOpen, setIsOpen] = useLocalStorage<boolean>({
    key: "sidebar-open-state",
    defaultValue: false,
  });
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  console.log(user);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  const SidebarVariants = {
    open: {
      width: "266px",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: "7rem",
      transition: {
        damping: 40,
      },
    },
  };

  const LogoVariants = {
    open: {
      height: "96px",
      width: "96px",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 40,
      },
    },
    closed: {
      height: "70px",
      width: "64px",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 40,
      },
    },
  };

  const options: Array<TOption | TSidebar | TDivider> = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="size-6" />,
    },
    {
      label: "Repositorios",
      href: "/repos",
      icon: <Archive className="size-6" />,
    },
    {
      label: "Pull Requests",
      href: "/prs",
      icon: <GitPullRequest className="size-6" />,
    },
    // {
    //   label: "AI config",
    //   href: "/ai",
    //   icon: <BrainCircuit className="size-6" />,
    // },
    {
      type: "divider",
    },
    // {
    //   label: 'System',
    //   icon: <GearFine className="size-6" weight="fill" />,
    //   type: 'submenu',
    //   items: [
    //     {
    //       label: 'System',
    //       href: Routes.system,
    //       icon: <ToggleRight className="size-6" weight="fill" />,
    //     },
    //     {
    //       label: 'Roles',
    //       href: Routes.roles,
    //       icon: <AddressBook className="size-6" weight="fill" />,
    //     },
    //     {
    //       label: 'Users',
    //       href: Routes.users,
    //       icon: <UsersThree className="size-6" weight="fill" />,
    //     },
    //   ],
    // },
    // {
    //   label: 'Logs',
    //   href: Routes.logs,
    //   icon: <ListDashes className="size-6" />,
    // },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <motion.div
      variants={SidebarVariants}
      animate={isOpen ? "open" : "closed"}
      initial="closed"
      className={cn(
        "relative flex h-full flex-col rounded-lg border-r-2 border-slate-400/15 bg-card px-4 shadow-lg transition-all duration-500 ease-in-out"
      )}
    >
      <button
        onClick={handleToggle}
        className="absolute -right-4 top-24 z-50 flex size-8 items-center justify-center rounded-[8px] border border-slate-700 bg-slate-800 text-sm font-semibold transition-colors duration-200"
      >
        <svg
          onClick={handleToggle}
          className={cn(
            isOpen ? "rotate-180" : "rotate-0",
            "transition-transform duration-300"
          )}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9.58574 6.21613L15.5595 11.3352C15.6558 11.4177 15.733 11.52 15.786 11.6352C15.839 11.7504 15.8664 11.8757 15.8664 12.0024C15.8664 12.1292 15.839 12.2545 15.786 12.3696C15.733 12.4848 15.6558 12.5872 15.5595 12.6697L9.58574 17.7887C9.01553 18.2773 8.13477 17.8722 8.13477 17.1215L8.13477 6.88192C8.13477 6.13117 9.01553 5.72613 9.58574 6.21613Z"
            fill="#FFF"
          />
        </svg>
      </button>
      <div className="flex w-full items-center justify-center pt-8">
        <motion.div
          className="relative flex max-h-24 w-full max-w-24 items-center justify-center p-8"
          variants={LogoVariants}
          animate={isOpen ? "open" : "closed"}
          initial="closed"
        >
          <Image src="/logo.png" alt="Logo" fill  />
        </motion.div>
      </div>

      <nav className="flex flex-1 flex-col justify-between overflow-y-auto pt-6">
        <ul className="flex w-full flex-col gap-2 whitespace-pre px-2">
          {options.map((option, idx) => {
            if (option.type === "divider") {
              return (
                <div className="h-px bg-neutral-4" key={`divider-${idx}`} />
              );
            }

            if (option.type === "submenu") {
              return (
                <li
                  key={idx}
                  className={`my-2 w-full rounded-lg ${
                    openSubmenu === option.label && "bg-primary_light"
                  } `}
                >
                  <button
                    onClick={() => handleSubmenuToggle(option.label)}
                    className={cn(
                      "relative flex w-full transform items-center rounded-lg px-4 py-3 text-primary-2 transition-all duration-300 hover:bg-auxiliary-header",
                      openSubmenu === option.label &&
                        "bg-primary-3 text-white hover:bg-primary-1"
                    )}
                  >
                    <div className="mr-3 flex size-6 justify-center text-center">
                      {option.icon}
                    </div>

                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isOpen ? 1 : 0 }}
                      exit={{ opacity: 0 }}
                      className={cn(
                        "overflow-hidden text-nowrap text-sm transition-opacity duration-300",
                        !isOpen && "opacity-0"
                      )}
                    >
                      {option.label}
                    </motion.span>

                    <ChevronDown
                      className={cn(
                        "absolute right-4 translate-x-0 transition-all duration-300",
                        {
                          "rotate-180": openSubmenu === option.label,
                          "translate-x-[12px]": !isOpen,
                        }
                      )}
                    />
                  </button>
                  {openSubmenu === option.label && (
                    <motion.ul
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      className={`overflow-hidden`}
                    >
                      {option.items.map((group) => (
                        <li
                          key={group.label}
                          className={cn("m-2 transition-all duration-300", {
                            "mx-1": !isOpen,
                          })}
                        >
                          <Link
                            className={cn(
                              "flex transform items-center rounded-lg px-3 py-3 text-primary-2 transition-all duration-300 hover:bg-auxiliary-header",
                              {
                                "bg-primary-3 text-white hover:bg-primary-1":
                                  isActiveRoute(group.href),
                              }
                            )}
                            href={group.href}
                          >
                            <div className="mr-3 flex size-6 justify-center text-center">
                              {group.icon}
                            </div>

                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: isOpen ? 1 : 0 }}
                              exit={{ opacity: 0 }}
                              className={cn(
                                "overflow-hidden text-nowrap text-sm transition-opacity duration-300",
                                !isOpen && "opacity-0"
                              )}
                            >
                              {group.label}
                            </motion.span>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              );
            }

            return (
              <Link
                key={idx}
                className={cn(
                  "flex transform items-center rounded-lg px-4 py-3 text-primary-2 transition-all duration-300 hover:bg-slate-500",
                  {
                    "bg-slate-700 text-white hover:bg-slate-700": isActiveRoute(
                      option.href!
                    ),
                  }
                )}
                href={option.href!}
              >
                <div className="mr-3 flex size-6 justify-center text-center">
                  {option.icon}
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "overflow-hidden text-nowrap text-sm transition-opacity duration-300",
                    !isOpen && "opacity-0"
                  )}
                >
                  {option.label}
                </motion.span>
              </Link>
            );
          })}
        </ul>
      </nav>
      <footer className="mb-4">
         <NavUser user={user?.user} sidebarOpen={isOpen} />
      </footer>
    </motion.div>
  );
}
