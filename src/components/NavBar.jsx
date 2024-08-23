import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Cambia el estado a su opuesto
  };
  return (
    <header className="fixed bg-background text-text w-full shadow-sm p-4">
      <div className="container mx-auto flex justify-around items-center">
        <h1 className="text-text text-2xl font-bold">Finance Tracker</h1>

        <nav>
          <ul
            className={`flex text-lg ssm:bg-background ssm:gap-3 ssm:pb-4 ssm:absolute ssm:flex-col ssm:top-16 ssm:w-full ssm:left-0 ssm:text-center md:static md:flex md:flex-row md:p-0 md:gap-10  ${
              isMenuOpen ? "hidden" : "block"
            }`}
          >
            <Link to="/">
              <li className="font-semibold">
                Home <span></span>
              </li>
            </Link>
            <Link to="/transactions">
              <li className="font-semibold">Transactions</li>
            </Link>
            {/* <Link to="/">
              <li>Summary</li>
            </Link>
            <Link to="/">
              <li>Settings</li>
            </Link> */}
          </ul>
          <RxHamburgerMenu
            className=" cursor-pointer md:hidden"
            onClick={toggleMenu}
          />
        </nav>
      </div>
    </header>
  );
}
