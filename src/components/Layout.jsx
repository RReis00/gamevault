import { Link, Outlet } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

function Layout() {
  const { theme } = useTheme();

  return (
    <>
      <Navbar
        className="shadow-sm app-navbar"
        bg={undefined}
        variant={undefined}
        expand="md"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            <span className="text-accent">GameVault</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/" className="me-2">
                <span className="nav-link-accent">Home</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/favorites" className="me-3">
                <span className="nav-link-accent">Favorites</span>
              </Nav.Link>
              <ThemeToggle />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main
        className="py-4"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default Layout;
