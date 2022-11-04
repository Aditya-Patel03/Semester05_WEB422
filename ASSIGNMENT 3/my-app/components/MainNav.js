import { Container, Nav, Navbar } from "react-bootstrap"
import Link from 'next/link';

export default function MainNav(){
    return (
        <>
        <Navbar className="fixed-top navbar-dark bg-dark" bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Patel Aditya Dharmesh</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link href="/" passHref><Nav.Link>Movies</Nav.Link></Link>
                    <Link href="/about" passHref><Nav.Link>About</Nav.Link></Link>
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br />
        <br />
        </>
    );
}