import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Convert", end: true },
  { to: "/rates", label: "Rates" },
  { to: "/history", label: "History" },
  { to: "/about", label: "About" },
];

export default function Nav() {
  return (
    <nav className="nav">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
