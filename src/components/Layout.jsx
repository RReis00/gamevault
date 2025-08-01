import { Link, Outlet } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

function Layout() {
  const { theme } = useTheme();

  return (
    <>
      <Navbar
        bg={theme === "dark" ? "dark" : "light"}
        variant={theme === "dark" ? "dark" : "light"}
        expand="md"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            <span className="text-warning">GameVault</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/" className="me-2">
                <span className="text-warning">Home</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/favorites" className="me-3">
                <span className="text-warning">Favorites</span>
              </Nav.Link>
              <ThemeToggle />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main
        className="py-4"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
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
