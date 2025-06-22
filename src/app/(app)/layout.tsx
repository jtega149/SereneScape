'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { mainNavItems, siteConfig } from '@/config/nav';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import pikachu from './pikachu-pfp.gif'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { supabase } from '../../../lib/supabase/client';

function Prefetcher() {
  const router = useRouter();

  useEffect(() => {
    const routes = [
      '/dashboard',
      '/meditations',
      '/soundscapes',
      '/breathing',
      '/affirmations',
    ];
    routes.forEach((route) => router.prefetch(route));
  }, []);

  return null;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
    router.push('/login');
  };

  return (
    <>
      <Prefetcher />
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen">
          <Sidebar collapsible="icon" className="border-r">
            <SidebarHeader className="p-4 flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 hover:no-underline"
              >
                <siteConfig.logo className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-headline font-semibold text-foreground group-data-[collapsible=icon]:hidden">
                  {siteConfig.name}
                </h1>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <ScrollArea className="h-full">
                <SidebarMenu className="p-2">
                  {mainNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={
                          pathname === item.href ||
                          (item.href !== '/dashboard' && pathname.startsWith(item.href))
                        }
                        tooltip={{
                          children: item.title,
                          side: 'right',
                          align: 'center',
                        }}
                        className="font-body"
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </ScrollArea>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t">
              <div
                className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center cursor-pointer"
                onClick={() => setIsProfileModalOpen(true)}
              >
                <Avatar className="h-9 w-9 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8">
                  <AvatarImage
                    //src="https://placehold.co/100x100.png"
                    src={pikachu.src}
                    alt="User Avatar"
                  />
                  <AvatarFallback>SS</AvatarFallback>
            
                </Avatar>
            
                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-medium text-foreground">
                    {user?.name || 'Serene User'}
                  </span>
                  <span className="text-xs text-muted-foreground">
            
 {user?.email}
                  </span>
                </div>
          
 <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening when clicking logout
                    handleLogout();
                  }}
                  variant="ghost"
                  size="icon"
                  className="ml-auto group-data-[collapsible=icon]:hidden"
            
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex-1 flex flex-col">
            <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1">{/* breadcrumbs if needed */}</div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>

      <AlertDialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
 <AlertDialogTitle className="flex justify-between items-center">
            <AlertDialogTitle>User Profile</AlertDialogTitle>
 <Button
 size="sm"
 variant="ghost"
 onClick={() => setIsProfileModalOpen(false)}
 >
 <X className="h-4 w-4" />
 </Button>
 </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={pikachu.src} alt="User Avatar" />
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold text-foreground">
                {user?.name || 'Serene User'}
              </span>
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <Button variant="outline" className="w-full">Change Profile Picture</Button>
             
            </div>
          </div>


        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}