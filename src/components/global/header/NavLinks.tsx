import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";

export function NavLinks() {
  // Safely parse the currentUser from localStorage
  const currentUserName = (() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");
      try {
        return storedUser ? JSON.parse(storedUser) : null;
      } catch (error) {
        console.error("Failed to parse currentUser from localStorage:", error);
        return null;
      }
    }
    return null;
  })();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-5">
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Link to="/chat">Chat</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {currentUserName ? (
            <div onClick={handleLogout} className="cursor-pointer">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Logout
              </NavigationMenuLink>
            </div>
          ) : (
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="/login">Login</Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
