import { AiOutlineBell} from "react-icons/ai";

import "./NavbarHeader.scss";

function NavbarHeader() {
  return (
    <nav className="navbar__header">
      <div className="navbar__left">
        <h3 className="navbar__user">
            Hello, Antran
        </h3>
      </div>
      <div className="navbar__right">
        {/* <AiOutlineSearch className="navbar__icon navbar__icon-search" /> */}
        <AiOutlineBell className="navbar__icon" />
      </div>
    </nav>
  );
}

export default NavbarHeader;
