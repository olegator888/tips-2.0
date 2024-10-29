import { Alert } from "@/features/alert";
import { NavigationMenu } from "@/features/navigation/ui/NavigationMenu";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useWebsockets } from "@/shared/hooks/useWebsockets";

export const App = () => {
  useWebsockets();

  return (
    <>
      <div className="h-[100dvh] flex flex-col overflow-y-hidden">
        <div className="h-full flex flex-col overflow-y-hidden px-2 pt-3">
          <Outlet />
        </div>
        <NavigationMenu />
      </div>
      <Toaster />
      <Alert />
    </>
  );
};
