import { Link, Outlet } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import { Home, Star } from "lucide-react";

function Layout() {
  return (
    <>
      {/* Navigation bar */}
      <Navbar className="shadow-sm app-navbar" expand="md">
        <Container>
          {/* App brand/title → link back to home */}
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            <span className="text-accent">GameVault</span>
          </Navbar.Brand>

          {/* Toggle button for mobile collapse */}
          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-center gap-2">
              {/* Home link */}
              <Nav.Link
                as={Link}
                to="/"
                className="me-1 d-flex align-items-center"
              >
                {/* Icon visible only on small screens */}
                <span className="d-inline d-md-none" aria-hidden="true">
                  <Home size={20} strokeWidth={2.5} color="var(--text)" />
                </span>
                {/* Text visible only on medium+ screens */}
                <span className="d-none d-md-inline nav-link-accent">Home</span>
                {/* Screen reader label for accessibility on mobile */}
                <span className="visually-hidden d-inline d-md-none">Home</span>
              </Nav.Link>

              {/* Favorites link */}
              <Nav.Link
                as={Link}
                to="/favorites"
                className="me-2 d-flex align-items-center"
              >
                {/* Icon on small screens */}
                <span className="d-inline d-md-none" aria-hidden="true">
                  <Star size={20} strokeWidth={2.5} color="var(--text)" />
                </span>
                {/* Text on larger screens */}
                <span className="d-none d-md-inline nav-link-accent">
                  Favorites
                </span>
                {/* Screen reader label for mobile */}
                <span className="visually-hidden d-inline d-md-none">
                  Favorites
                </span>
              </Nav.Link>

              {/* Theme toggle: full label on desktop, icon only on mobile */}
              <div className="d-none d-md-flex">
                <ThemeToggle showLabel />
              </div>
              <div className="d-flex d-md-none">
                <ThemeToggle iconOnly />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content area, with dynamic background/text via CSS variables */}
      <main
        className="py-4"
        style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
      >
        <Container>
          {/* Placeholder for child routes */}
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default Layout;
