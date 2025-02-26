import { useMemo } from "react";
import { mockSidebar } from "@/mocks/mock-sidebar";
import { useNavigate } from "@tanstack/react-router";
import { KBarAnimator, KBarPortal, KBarPositioner, KBarProvider, KBarSearch } from "kbar";
import RenderResults from "./render-result";
import useThemeSwitching from "./use-theme-switching";

export default function KBar({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  // These action are for the navigation
  const actions = useMemo(
    () =>
      mockSidebar.menuItems.flatMap((navItem) => {
        // Only include base action if the navItem has a real URL and is not just a container
        const baseAction =
          navItem.path !== "#"
            ? {
                id: `${navItem.title.toLowerCase()}Action`,
                name: navItem.title,
                shortcut: navItem.shortcut,
                keywords: navItem.title.toLowerCase(),
                section: "Navigation",
                subtitle: `Go to ${navItem.title}`,
                perform: () =>
                  navigate({
                    to: navItem.path,
                  }),
              }
            : null;

        // Map child items into actions
        const childActions = navItem.children
          ? navItem.children?.map((childItem: API.MenuItem) => ({
              id: `${childItem.title.toLowerCase()}Action`,
              name: childItem.title,
              shortcut: childItem.shortcut,
              keywords: childItem.title.toLowerCase(),
              section: navItem.title,
              subtitle: `Go to ${childItem.title}`,
              perform: () =>
                navigate({
                  to: childItem.path,
                }),
            }))
          : [];

        // Return only valid actions (ignoring null base actions for containers)
        return baseAction ? [baseAction, ...childActions] : childActions;
      }),
    [],
  );

  return (
    <KBarProvider actions={actions}>
      <KBarComponent>{children}</KBarComponent>
    </KBarProvider>
  );
}
const KBarComponent = ({ children }: { children: React.ReactNode }) => {
  useThemeSwitching();

  return (
    <>
      <KBarPortal>
        <KBarPositioner className='scrollbar-hide fixed inset-0 z-[99999] bg-black/80 !p-0 backdrop-blur-sm'>
          <KBarAnimator className='relative !mt-64 w-full max-w-[600px] !-translate-y-12 overflow-hidden rounded-lg border bg-background text-foreground shadow-lg'>
            <div className='bg-background'>
              <div className='border-x-0 border-b-2'>
                <KBarSearch className='w-full border-none bg-background px-6 py-4 text-lg outline-none focus:outline-none focus:ring-0 focus:ring-offset-0' />
              </div>
              <RenderResults />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </>
  );
};
