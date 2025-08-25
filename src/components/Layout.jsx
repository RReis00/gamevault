import { Link, Outlet } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { Home, Star } from "lucide-react";

function Layout() {
  const { theme } = useTheme();

  return (
    <>
      <Navbar className="shadow-sm app-navbar" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            <span className="text-accent">GameVault</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-center gap-2">
              <Nav.Link
                as={Link}
                to="/"
                className="me-1 d-flex align-items-center"
              >
                <span className="d-inline d-md-none" aria-hidden="true">
                  <Home size={20} strokeWidth={2.5} color="var(--text)" />
                </span>
                <span className="d-none d-md-inline nav-link-accent">Home</span>
                <span className="visually-hidden d-inline d-md-none">Home</span>
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/favorites"
                className="me-2 d-flex align-items-center"
              >
                <span className="d-inline d-md-none" aria-hidden="true">
                  <Star size={20} strokeWidth={2.5} color="var(--text)" />
                </span>
                <span className="d-none d-md-inline nav-link-accent">
                  Favorites
                </span>
                <span className="visually-hidden d-inline d-md-none">
                  Favorites
                </span>
              </Nav.Link>

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

      <main
        className="py-4"
        style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
      >
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default Layout;
