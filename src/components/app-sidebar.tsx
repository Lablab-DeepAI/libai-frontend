"use client";
import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./ui/nav-user";
import { Logo } from "./ui/logo-placeholder";
import { getUserDetail, signOutAction } from "@/app/action";

const data = {
  navMain: [
    {
      title: "Document Management",
      url: "/docs",
      items: [
        {
          title: "Upload Doc",
          url: "/docs/upload",
        },
        {
          title: "Find Doc",
          url: "/docs",
        },
        {
          title: "QA Page",
          url: "/qa",
        },
        {
          title: "Recommendations",
          url: "/recommendations",
        },
        {
          title: "Summarizer",
          url: "/summarization",
        },
      ],
    },

    {
      title: "API Management",
      url: "/apis",
      items: [
        {
          title: "Manage API",
          url: "/apis",
        },
      ],
    },
  ],
};

interface UserAccount {
  id: string;
  aud: string;
  role?: string | undefined;
  email?: string | undefined;
  email_confirmed_at?: string | undefined;
  phone?: string | undefined;
  confirmed_at?: string | undefined;
  recovery_sent_at?: string | undefined;
  last_sign_in_at?: string | undefined;
  app_metadata?: Record<string, unknown>;
  user_metadata?: {
    displayName?: string; // Optional property
    [key: string]: unknown; // Allow additional properties
  };
  created_at: string | undefined;
  updated_at?: string | undefined;
  is_anonymous?: boolean | undefined;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const routeUrl = usePathname();
  const [user, setUser] = React.useState<UserAccount | null>(null);
  React.useEffect(() => {
    async function fetchUser() {
      const userInfo = await getUserDetail();
      setUser(userInfo);
    }
    fetchUser();
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Logo />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Rumsan AI</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}&nbsp;
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item?.url === routeUrl}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.user_metadata?.displayName || "",
            email: user?.email || "",
            avatar: "",
          }}
          logOut={signOutAction}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
