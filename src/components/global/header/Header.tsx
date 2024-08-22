import { Link } from "react-router-dom";
import { NavLinks } from "./NavLinks";

const Header = () => {
  return (
    <div className="p-3 sticky top-0 z-40 bg-secondary">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-2">
        <Link to={"/"}>
          <h4 className="font-semibold text-primary"> Chat App</h4>
        </Link>
        <div className="space-x-5">
          <NavLinks />
        </div>
      </nav>
    </div>
  );
};

export default Header;
