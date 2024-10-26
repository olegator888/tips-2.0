import { navigationMenuHeight, routesDict } from "@/shared/constants";
import { cn } from "@/shared/lib";
import { AppRoutes } from "@/shared/routing";
import { NavLink, useLocation } from "react-router-dom";
import { MdOutlineCelebration } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { FaList } from "react-icons/fa";

const links = [
  {
    route: AppRoutes.BANQUETS,
    Icon: MdOutlineCelebration,
  },
  {
    route: AppRoutes.WAITERS_ACCOUNTING,
    Icon: FaCoins,
  },
  {
    route: AppRoutes.WAITERS_LIST,
    Icon: FaList,
  },
];

export const NavigationMenu = () => {
  const { pathname } = useLocation();
  return (
    <div
      className="flex items-center shrink-0 bg-accent"
      style={{ height: navigationMenuHeight }}
    >
      {links.map(({ route, Icon }) => (
        <NavLink
          key={route}
          to={route}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 transition text-sm font-medium pt-2 pb-4",
            route === pathname && "bg-primary text-white"
          )}
        >
          {routesDict[route]}
          <Icon />
        </NavLink>
      ))}
    </div>
  );
};
