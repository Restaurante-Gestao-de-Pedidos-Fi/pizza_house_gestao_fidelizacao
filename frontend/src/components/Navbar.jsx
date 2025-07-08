import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarComponent = ({ routes }) => {
  console.log("NavbarComponent", routes);
  return (
    /*  <Navbar bg="light" expand="lg"> */
    <Navbar
      bg="gradient"
      style={{ background: " #ff9624", fontFamily: "ChunkFive Print" }}
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="/" className="me-5 fs-1">
          Toti Fullstack
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            {routes.map((route) => (
              <Nav.Link key={route.id} href={route.path} className="mx-3 fs-3">
                {route.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
