import { IconMenu } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavMenu = {
  title: string;
  href: string;
  isActive: boolean;
};

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  menus?: NavMenu[];
}

export function TopNav({ className, menus, ...props }: TopNavProps) {
  return (
    <>
      <div className='md:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='outline'>
              <IconMenu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='start'>
            {menus?.map(({ title, href, isActive }) => (
              <DropdownMenuItem key={`${title}-${href}`} asChild>
                <Link to={href} className={!isActive ? "text-muted-foreground" : ""}>
                  {title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className={cn("hidden items-center space-x-4 md:flex lg:space-x-6", className)} {...props}>
        {menus?.map(({ title, href, isActive }) => (
          <Link
            key={`${title}-${href}`}
            to={href}
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "" : "text-muted-foreground"}`}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  );
}

export type { TopNavProps };
